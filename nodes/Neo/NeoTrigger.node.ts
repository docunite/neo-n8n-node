import {
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	NodeOperationError,
	NodeConnectionTypes,
} from 'n8n-workflow';

export class NeoTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'docunite® NEO Trigger',
		name: 'neoTrigger',
		icon: 'file:neo.svg',
		group: ['trigger'],
		version: 1,
		description: 'Automatically starts the workflow when docunite® NEO sends events (EXTRACTION, CLASSIFICATION, ENRICHMENT). Registers a webhook when activated and removes it when deactivated. Validates secret from x-neo-secret header for secure authentication.',
		defaults: {
			name: 'docunite® NEO Trigger',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'neoApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
		{
			displayName: 'Webhook URLs',
			name: 'webhookUrlsNotice',
			type: 'notice',
			default: '**Test Mode:** Click "Listen for Test Event" to get the webhook URL. You need to manually register this URL in docunite® NEO for testing. Secret validation is automatically disabled during testing.\n\n**Production Mode:** Activate the workflow to automatically register the webhook in docunite® NEO. The webhook will be removed when you deactivate the workflow.',
		},
			{
				displayName: 'Event Types',
				name: 'eventTypes',
				type: 'multiOptions',
				required: true,
				default: [],
				description: 'The event types to listen for',
				options: [
					{
						name: 'Extraction',
						value: 'EXTRACTION',
						description: 'Triggers when document extraction is completed',
					},
					{
						name: 'Classification',
						value: 'CLASSIFICATION',
						description: 'Triggers when document classification is completed',
					},
					{
						name: 'Enrichment',
						value: 'ENRICHMENT',
						description: 'Triggers when document enrichment is completed',
					},
				],
			},
		{
			displayName: 'Webhook Name',
			name: 'webhookName',
			type: 'string',
			required: true,
			default: '',
			placeholder: 'n8n NEO Workflow Trigger',
			description: 'Name for the webhook in docunite® NEO',
		},
		{
			displayName: 'Secret',
			name: 'secret',
			type: 'string',
			required: true,
			default: '',
			placeholder: 'my-secure-secret',
			description: 'Choose a security key for webhook authentication. This key will be sent to NEO when activating the workflow. NEO will then include it in the "x-neo-secret" header with every request, ensuring only authorized requests are accepted.',
			typeOptions: {
				password: true,
			},
		},
		{
			displayName: 'Validate Secret',
			name: 'validateSecret',
			type: 'boolean',
			default: true,
			description: 'Whether to validate the secret from the header (automatically disabled in test mode)',
		},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				
				// Don't register test webhooks automatically - user must do it manually in NEO
				if (webhookUrl.includes('/webhook-test/')) {
					return false;
				}
				
				const credentials = await this.getCredentials('neoApi');
				const baseUrl = credentials.baseUrl as string;

				try {
					// Get all webhooks and check if one with this URL already exists
					const webhooks = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'neoApi',
						{
							method: 'GET',
							baseURL: baseUrl,
							url: '/webhooks',
						},
					);

					// Check if a webhook with this URL exists
					if (Array.isArray(webhooks)) {
						for (const webhook of webhooks) {
							if (webhook.callback_url === webhookUrl) {
								// Save the webhook ID for later deletion
								const webhookData = this.getWorkflowStaticData('node');
								webhookData.webhookId = webhook.id;
								return true;
							}
						}
					}

					return false;
				} catch (error) {
					return false;
				}
			},

			async create(this: IHookFunctions): Promise<boolean> {
			const webhookUrl = this.getNodeWebhookUrl('default') as string;
			
			// Don't register test webhooks automatically - user must do it manually in NEO
			if (webhookUrl.includes('/webhook-test/')) {
				return true;
			}
			
			const eventTypes = this.getNodeParameter('eventTypes') as string[];
			const webhookName = this.getNodeParameter('webhookName') as string;
			const secret = this.getNodeParameter('secret') as string;
			const credentials = await this.getCredentials('neoApi');
			const baseUrl = credentials.baseUrl as string;

			if (eventTypes.length === 0) {
				throw new NodeOperationError(
					this.getNode(),
					'At least one event type must be selected',
				);
			}

			// Create the webhook in NEO
			const body: IDataObject = {
				name: webhookName,
				callback_url: webhookUrl,
				event_types: eventTypes,
				provider_type: 'default',
				secret: secret,
			};

				try {
					const webhookData = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'neoApi',
						{
							method: 'POST',
							baseURL: baseUrl,
							url: '/webhooks',
							body: body,
						},
					);

				// Save the webhook ID for later deletion
				const workflowStaticData = this.getWorkflowStaticData('node');
				workflowStaticData.webhookId = webhookData.id;

				return true;
				} catch (error) {
					throw new NodeOperationError(
						this.getNode(),
						`Failed to create webhook in docunite® NEO: ${error.message}`,
					);
				}
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				
				// Don't try to delete test webhooks - they were never registered automatically
				if (webhookUrl.includes('/webhook-test/')) {
					return true;
				}
				
				const webhookData = this.getWorkflowStaticData('node');
				const webhookId = webhookData.webhookId as string;

				if (!webhookId) {
					// No webhook ID available - nothing to delete
					return true;
				}

				const credentials = await this.getCredentials('neoApi');
				const baseUrl = credentials.baseUrl as string;

				try {
					await this.helpers.httpRequestWithAuthentication.call(
						this,
						'neoApi',
						{
							method: 'DELETE',
							baseURL: baseUrl,
							url: `/webhooks/${webhookId}`,
						},
					);

					// Delete the stored webhook ID
					delete webhookData.webhookId;

					return true;
				} catch (error) {
					// Delete the ID even on error (e.g. webhook no longer exists)
					delete webhookData.webhookId;
					
					// If webhook was not found (404), that's ok
					if (error.statusCode === 404 || error.response?.statusCode === 404) {
						return true;
					}
					
					return true;
				}
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();
		const headerData = this.getHeaderData();
		const secret = this.getNodeParameter('secret') as string;
		const validateSecret = this.getNodeParameter('validateSecret', true) as boolean;

		// Check if we are in test/development mode
		const mode = this.getMode();
		const isTestExecution = mode === 'manual';

		// Validate the secret only when:
		// - Not in test mode
		// - Validation is enabled
		if (!isTestExecution && validateSecret) {
			const receivedSecret = headerData['x-neo-secret'] as string;
			
			if (!receivedSecret) {
				throw new NodeOperationError(
					this.getNode(),
					'Webhook secret missing in x-neo-secret header',
				);
			}

			if (receivedSecret !== secret) {
				throw new NodeOperationError(
					this.getNode(),
					'Webhook secret validation failed - unauthorized request',
				);
			}
		}

		// Extract event type from the body
		// NEO might send event_type directly or we need to infer it from the registered event types
		const eventType = bodyData.event_type as string;

		// Prepare the output data
		const returnData: IDataObject = {
			event_type: eventType,
			timestamp: bodyData.timestamp || new Date().toISOString(),
			data: bodyData,
			headers: headerData,
			test_mode: isTestExecution,
			mode: mode,
		};

		return {
			workflowData: [
				this.helpers.returnJsonArray(returnData),
			],
		};
	}
}

