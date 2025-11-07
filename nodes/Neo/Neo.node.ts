import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
	NodeOperationError,
} from 'n8n-workflow';

export class Neo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Neo',
		name: 'neo',
		icon: 'file:neo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Neo API (docunite.ai) for document management and AI processing',
		defaults: {
			name: 'Neo',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'neoApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// Resource Selection
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Entity',
						value: 'entity',
					},
					{
						name: 'Prompt',
						value: 'prompt',
					},
					{
						name: 'Schema',
						value: 'schema',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
				default: 'document',
			},

			// =====================================================
			// ACCOUNT OPERATIONS
			// =====================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['account'],
					},
				},
				options: [
					{
						name: 'Get Balance',
						value: 'getBalance',
						description: 'Retrieve the credit balance of the current tenant',
						action: 'Get balance',
					},
					{
						name: 'Get Usage',
						value: 'getUsage',
						description: 'Retrieve usage data with daily, monthly, and yearly breakdowns',
						action: 'Get usage',
					},
					{
						name: 'Get Usage With Process Steps',
						value: 'getUsageWithProcessSteps',
						description: 'Retrieve detailed usage information with process step breakdowns',
						action: 'Get usage with process steps',
					},
				],
				default: 'getBalance',
			},

			// =====================================================
			// DOCUMENT OPERATIONS
			// =====================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['document'],
					},
				},
				options: [
					{
						name: 'Upload',
						value: 'upload',
						description: 'Upload and process documents',
						action: 'Upload document',
					},
					{
						name: 'Get document',
						value: 'get',
						description: 'Get a document by ID',
						action: 'Get document',
					},
					{
						name: 'Get document batch',
						value: 'getBatch',
						description: 'Get documents by correlation ID f.e. extracted attachments from a document',
						action: 'Get batch documents',
					},
					{
						name: 'Get Document PDF Blob',
						value: 'getBlob',
						description: 'Get a PDF version of the document blob',
						action: 'Get document blob',
					},
					{
						name: 'Get Document Original Blob',
						value: 'getBlobOriginal',   
						description: 'Get a original version of the document blob',
						action: 'Get original blob',
					},
					{
						name: 'Get Document OCR',
						value: 'getContent',
						description: 'Get document OCR content',
						action: 'Get OCR content',
					},
					{
						name: 'Get Document Markdown',
						value: 'getMarkdown',
						description: 'Get document markdown content',
						action: 'Get markdown content',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete documents',
						action: 'Delete documents',
					},
					{
						name: 'Chat',
						value: 'chat',
						description: 'Chat with documents using AI',
						action: 'Chat with documents',
					},
					{
						name: 'Classify',
						value: 'classify',
						description: 'Classify documents',
						action: 'Classify documents',
					},
					{
						name: 'Enrichment',
						value: 'enrichment',
						description: 'Initiate document enrichment',
						action: 'Enrich documents',
					},
					{
						name: 'Extraction',
						value: 'extraction',
						description: 'Extract data from documents',
						action: 'Extract data',
					},
					{
						name: 'Split',
						value: 'split',
						description: 'Split documents',
						action: 'Split documents',
					},
				],
				default: 'upload',
			},

			// Document Operation Parameters
			// Upload Parameters
			{
				displayName: 'Entity ID',
				name: 'entityId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['upload'],
					},
				},
				default: '',
				description: 'The entity ID to associate with the document',
			},
			{
				displayName: 'Input Binary Field',
				name: 'binaryPropertyName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['upload'],
					},
				},
				default: 'data',
				description: 'Name of the binary property containing the file to upload',
			},
			{
				displayName: 'Classify',
				name: 'classify',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['upload'],
					},
				},
				default: true,
				description: 'Whether to enable document classification',
			},
			{
				displayName: 'Split Documents',
				name: 'splitDocuments',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['upload'],
					},
				},
				default: false,
				description: 'Whether to enable intelligent document splitting',
			},
			{
				displayName: 'Prompt ID',
				name: 'promptId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['upload', 'classify'],
					},
				},
				default: '',
				description: 'Prompt ID to use for classification (must be of type "Classification")',
			},
			{
				displayName: 'Original Path',
				name: 'originalPath',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['upload'],
					},
				},
				default: '',
				description: 'Optional path to store with the document',
			},

			// Document ID parameter (used by many operations)
			{
				displayName: 'Document ID',
				name: 'documentId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['document'],
						operation: [
							'get',
							'delete',
							'update',
							'chat',
							'getBlob',
							'getBlobOriginal',
							'getContent',
							'getMarkdown',
						],
					},
				},
				default: '',
				description: 'The ID of the document',
			},

			// Correlation ID for batch operations
			{
				displayName: 'Correlation ID',
				name: 'correlationId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['getBatch'],
					},
				},
				default: '',
				description: 'The correlation ID to retrieve batch documents',
			},

			// Document IDs for multiple operations
			{
				displayName: 'Document IDs',
				name: 'documentIds',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['deleteMultiple'],
					},
				},
				default: '',
				description: 'Comma-separated list of document IDs',
			},

			// File IDs for document operations
			{
				displayName: 'File IDs',
				name: 'fileIds',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['classify', 'enrichment', 'extraction', 'split'],
					},
				},
				default: '[]',
				description: 'Array of file IDs, e.g. ["file-id-1", "file-id-2"]',
				placeholder: '["abc123", "def456"]',
			},

			// Chat parameters
			{
				displayName: 'Prompt',
				name: 'prompt',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['chat'],
					},
				},
				default: '',
				description: 'The question or prompt for the chat',
				typeOptions: {
					rows: 4,
				},
			},
			{
				displayName: 'Chat History',
				name: 'chatHistory',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['chat'],
					},
				},
				default: '',
				description: 'Optional chat history as JSON array',
			},

			// =====================================================
			// ENTITY OPERATIONS
			// =====================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['entity'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new entity',
						action: 'Create entity',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an entity',
						action: 'Delete entity',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an entity by ID',
						action: 'Get entity',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all entities',
						action: 'Get all entities',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an entity',
						action: 'Update entity',
					},
				],
				default: 'getAll',
			},

			// Entity ID parameter
			{
				displayName: 'Entity ID',
				name: 'entityIdParam',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['entity'],
						operation: ['get', 'delete', 'update'],
					},
				},
				default: '',
				description: 'The ID of the entity',
			},

			// Entity Create/Update parameters
			{
				displayName: 'Name',
				name: 'entityName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['entity'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Name of the entity',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['entity'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Description of the entity',
			},

			// =====================================================
			// PROMPT OPERATIONS
			// =====================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['prompt'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new prompt',
						action: 'Create prompt',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a prompt',
						action: 'Delete prompt',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a prompt by ID',
						action: 'Get prompt',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all prompts',
						action: 'Get all prompts',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a prompt',
						action: 'Update prompt',
					},
				],
				default: 'getAll',
			},

			// Prompt ID parameter
			{
				displayName: 'Prompt ID',
				name: 'promptIdParam',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['get', 'delete', 'update'],
					},
				},
				default: '',
				description: 'The ID of the prompt',
			},

			// Prompt Create/Update parameters
			{
				displayName: 'Name',
				name: 'promptName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Name of the prompt',
			},
			{
				displayName: 'Content',
				name: 'promptContent',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Content of the prompt',
				typeOptions: {
					rows: 6,
				},
			},
			{
				displayName: 'Type',
				name: 'promptType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create'],
					},
				},
				options: [
					{
						name: 'Classification',
						value: 'Classification',
					},
					{
						name: 'Enrichment',
						value: 'Enrichment',
					},
					{
						name: 'Chat',
						value: 'Chat',
					},
				],
				default: 'Classification',
				description: 'Type of the prompt',
			},
			{
				displayName: 'Additional Fields',
				name: 'promptFields',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['create', 'update'],
					},
				},
				default: '{}',
				description: 'Additional fields as JSON object',
			},

			// =====================================================
			// SCHEMA OPERATIONS
			// =====================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['schema'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new schema',
						action: 'Create schema',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a schema',
						action: 'Delete schema',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a schema by ID',
						action: 'Get schema',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all schemas',
						action: 'Get all schemas',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a schema',
						action: 'Update schema',
					},
				],
				default: 'getAll',
			},

			// Schema ID parameter
			{
				displayName: 'Schema ID',
				name: 'schemaIdParam',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['schema'],
						operation: ['get', 'delete', 'update'],
					},
				},
				default: '',
				description: 'The ID of the schema',
			},

			// Schema Create/Update parameters
			{
				displayName: 'Name',
				name: 'schemaName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['schema'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Name of the schema',
			},
			{
				displayName: 'Schema Definition',
				name: 'schemaDefinition',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['schema'],
						operation: ['create'],
					},
				},
				default: '{}',
				description: 'JSON Schema definition',
			},
			{
				displayName: 'Additional Fields',
				name: 'schemaFields',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['schema'],
						operation: ['create', 'update'],
					},
				},
				default: '{}',
				description: 'Additional fields as JSON object',
			},

			// =====================================================
			// USER OPERATIONS
			// =====================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Get Info',
						value: 'getInfo',
						description: 'Get user information',
						action: 'Get user info',
					},
				],
				default: 'getInfo',
			},

			// =====================================================
			// WEBHOOK OPERATIONS
			// =====================================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new webhook',
						action: 'Create webhook',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a webhook',
						action: 'Delete webhook',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a webhook by ID',
						action: 'Get webhook',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all webhooks',
						action: 'Get all webhooks',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a webhook',
						action: 'Update webhook',
					},
				],
				default: 'getAll',
			},

			// Webhook ID parameter
			{
				displayName: 'Webhook ID',
				name: 'webhookIdParam',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['get', 'delete', 'update'],
					},
				},
				default: '',
				description: 'The ID of the webhook',
			},

			// Webhook Create/Update parameters
			{
				displayName: 'Name',
				name: 'webhookName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Name of the webhook',
			},
			{
				displayName: 'Callback URL',
				name: 'webhookCallbackUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Callback URL for the webhook',
			},
			{
				displayName: 'Event Types',
				name: 'webhookEventTypes',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Comma-separated list of event types',
			},
			{
				displayName: 'Provider Type',
				name: 'webhookProviderType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create'],
					},
				},
				options: [
					{
						name: 'Docunite',
						value: 'docunite',
					},
					{
						name: 'Teams',
						value: 'teams',
					},
					{
						name: 'Default',
						value: 'default',
					},
				],
				default: 'docunite',
				description: 'Provider type of the webhook',
			},
			{
				displayName: 'Additional Fields',
				name: 'webhookFields',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create', 'update'],
					},
				},
				default: '{}',
				description: 'Additional fields as JSON object',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Get baseURL from credentials
		const credentials = await this.getCredentials('neoApi');
		const baseUrl = credentials.baseUrl as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				// =====================================================
				// ACCOUNT RESOURCE
				// =====================================================
				if (resource === 'account') {
					if (operation === 'getBalance') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: '/account-management/credits/balance',
							},
						);
					} else if (operation === 'getUsage') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: '/account-management/credits/usage',
							},
						);
					} else if (operation === 'getUsageWithProcessSteps') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: '/account-management/credits/with-process-steps',
							},
						);
					}
				}

				// =====================================================
				// DOCUMENT RESOURCE
				// =====================================================
				else if (resource === 'document') {
					if (operation === 'upload') {
						const entityId = this.getNodeParameter('entityId', i) as string;
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
						const classify = this.getNodeParameter('classify', i, true) as boolean;
						const splitDocuments = this.getNodeParameter('splitDocuments', i, false) as boolean;
						const promptId = this.getNodeParameter('promptId', i, '') as string;
						const originalPath = this.getNodeParameter('originalPath', i, '') as string;

						const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
						const dataBuffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

						const formDataObject: { [key: string]: any } = {
							entity_id: entityId,
							classify: classify,
							split_documents: splitDocuments,
							file: {
								value: dataBuffer,
								options: {
									filename: binaryData.fileName,
									contentType: binaryData.mimeType,
								},
							},
						};

						if (promptId) {
							formDataObject.prompt_id = promptId;
						}

						if (originalPath) {
							formDataObject.original_path = originalPath;
						}

						const options: IHttpRequestOptions = {
							method: 'POST',
							baseURL: baseUrl,
							url: '/document-management/documents',
							headers: {
								'Content-Type': 'multipart/form-data',
							},
							body: formDataObject,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							options,
						);
					} else if (operation === 'get') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: `/document-management/documents/${documentId}`,
							},
						);
					} else if (operation === 'delete') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'DELETE',
								baseURL: baseUrl,
								url: `/document-management/documents/${documentId}`,
							},
						);
					} else if (operation === 'deleteMultiple') {
						const documentIdsStr = this.getNodeParameter('documentIds', i) as string;
						const documentIds = documentIdsStr.split(',').map((id) => id.trim());

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'DELETE',
								baseURL: baseUrl,
								url: '/document-management/documents',
								body: {
									document_ids: documentIds,
								},
							},
						);
					} else if (operation === 'getBatch') {
						const correlationId = this.getNodeParameter('correlationId', i) as string;
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: `/document-management/documents/batch/${correlationId}`,
							},
						);
					} else if (operation === 'chat') {
						const documentId = this.getNodeParameter('documentId', i) as string;
						const prompt = this.getNodeParameter('prompt', i) as string;
						const promptId = this.getNodeParameter('promptId', i, '') as string;
						const chatHistoryStr = this.getNodeParameter('chatHistory', i, '') as string;

						const body: IDataObject = {
							document_ids: [documentId],
							prompt: prompt,
						};

						if (promptId) {
							body.prompt_id = promptId;
						}

						if (chatHistoryStr) {
							try {
								body.chat_history = JSON.parse(chatHistoryStr);
							} catch (error) {
								throw new NodeOperationError(
									this.getNode(),
									'Chat history must be valid JSON',
									{ itemIndex: i },
								);
							}
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'POST',
								baseURL: baseUrl,
								url: '/document-management/documents/chat',
								body: body,
							},
						);
					} else if (operation === 'classify') {
						const fileIdsInput = this.getNodeParameter('fileIds', i) as string;
						const promptId = this.getNodeParameter('promptId', i, '') as string;

						let fileIds: string[] = [];
						try {
							fileIds = JSON.parse(fileIdsInput);
							if (!Array.isArray(fileIds)) {
								throw new Error('File IDs must be an array');
							}
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								'File IDs must be a valid JSON array, e.g. ["id1", "id2"]',
								{ itemIndex: i },
							);
						}

						const body: IDataObject = {
							file_ids: fileIds,
						};

						if (promptId) {
							body.prompt_id = promptId;
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'POST',
								baseURL: baseUrl,
								url: '/document-management/documents/classification',
								body: body,
							},
						);
					} else if (operation === 'getBlob') {
						const documentId = this.getNodeParameter('documentId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: `/document-management/documents/${documentId}/blob`,
								encoding: 'arraybuffer',
								returnFullResponse: true,
							},
						);

						const binaryData = await this.helpers.prepareBinaryData(
							Buffer.from(responseData.body as ArrayBuffer),
							`document_${documentId}`,
						);

						return [
							[
								{
									json: { documentId },
									binary: {
										data: binaryData,
									},
								},
							],
						];
					} else if (operation === 'getBlobOriginal') {
						const documentId = this.getNodeParameter('documentId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: `/document-management/documents/${documentId}/blob/original`,
								encoding: 'arraybuffer',
								returnFullResponse: true,
							},
						);

						const binaryData = await this.helpers.prepareBinaryData(
							Buffer.from(responseData.body as ArrayBuffer),
							`document_${documentId}_original`,
						);

						return [
							[
								{
									json: { documentId },
									binary: {
										data: binaryData,
									},
								},
							],
						];
					} else if (operation === 'getContent') {
						const documentId = this.getNodeParameter('documentId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: `/document-management/documents/${documentId}/content`,
							},
						);
					} else if (operation === 'getMarkdown') {
						const documentId = this.getNodeParameter('documentId', i) as string;

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: `/document-management/documents/${documentId}/markdown`,
							},
						);
					} else if (operation === 'enrichment') {
						const fileIdsInput = this.getNodeParameter('fileIds', i) as string;
						const promptId = this.getNodeParameter('promptId', i, '') as string;

						let fileIds: string[] = [];
						try {
							fileIds = JSON.parse(fileIdsInput);
							if (!Array.isArray(fileIds)) {
								throw new Error('File IDs must be an array');
							}
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								'File IDs must be a valid JSON array, e.g. ["id1", "id2"]',
								{ itemIndex: i },
							);
						}

						const body: IDataObject = {
							file_ids: fileIds,
						};

						if (promptId) {
							body.prompt_id = promptId;
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'POST',
								baseURL: baseUrl,
								url: '/document-management/documents/enrichment',
								body: body,
							},
						);
					} else if (operation === 'extraction') {
						const fileIdsInput = this.getNodeParameter('fileIds', i) as string;
						const promptId = this.getNodeParameter('promptId', i, '') as string;

						let fileIds: string[] = [];
						try {
							fileIds = JSON.parse(fileIdsInput);
							if (!Array.isArray(fileIds)) {
								throw new Error('File IDs must be an array');
							}
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								'File IDs must be a valid JSON array, e.g. ["id1", "id2"]',
								{ itemIndex: i },
							);
						}

						const body: IDataObject = {
							file_ids: fileIds,
						};

						if (promptId) {
							body.prompt_id = promptId;
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'POST',
								baseURL: baseUrl,
								url: '/document-management/documents/extraction',
								body: body,
							},
						);
					} else if (operation === 'split') {
						const fileIdsInput = this.getNodeParameter('fileIds', i) as string;

						let fileIds: string[] = [];
						try {
							fileIds = JSON.parse(fileIdsInput);
							if (!Array.isArray(fileIds)) {
								throw new Error('File IDs must be an array');
							}
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								'File IDs must be a valid JSON array, e.g. ["id1", "id2"]',
								{ itemIndex: i },
							);
						}

						const body: IDataObject = {
							file_ids: fileIds,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'POST',
								baseURL: baseUrl,
								url: '/document-management/documents/split',
								body: body,
							},
						);
					} 
				}

				// =====================================================
				// ENTITY RESOURCE
				// =====================================================
				else if (resource === 'entity') {
					if (operation === 'getAll') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: '/entity-management/entities',
							},
						);
					} else if (operation === 'get') {
						const entityId = this.getNodeParameter('entityIdParam', i) as string;
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: `/entity-management/entities/${entityId}`,
							},
						);
					} else if (operation === 'create') {
						const name = this.getNodeParameter('entityName', i) as string;
						const description = this.getNodeParameter('description', i, '') as string;

						const body: IDataObject = {
							name,
							description: description || '',  // ✅ Immer senden, auch wenn leer
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'POST',
								baseURL: baseUrl,
								url: '/entity-management/entities',
								body: body,
							},
						);
					} else if (operation === 'update') {
						const entityId = this.getNodeParameter('entityIdParam', i) as string;
						const name = this.getNodeParameter('entityName', i) as string;
						const description = this.getNodeParameter('description', i, '') as string;

						const body: IDataObject = {
							name: name,
							description: description || '',
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'PUT',
								baseURL: baseUrl,
								url: `/entity-management/entities/${entityId}`,
								body: body,
							},
						);
					} else if (operation === 'delete') {
						const entityId = this.getNodeParameter('entityIdParam', i) as string;
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'DELETE',
								baseURL: baseUrl,
								url: `/entity-management/entities/${entityId}`,
							},
						);
					}
				}

				// =====================================================
				// PROMPT RESOURCE
				// =====================================================
				else if (resource === 'prompt') {
					if (operation === 'getAll') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: '/prompt-management/prompts',
							},
						);
					} else if (operation === 'get') {
						const promptId = this.getNodeParameter('promptIdParam', i) as string;
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: `/prompt-management/prompts/${promptId}`,
							},
						);
					} else if (operation === 'create') {
						const name = this.getNodeParameter('promptName', i) as string;
						const content = this.getNodeParameter('promptContent', i) as string;
						const type = this.getNodeParameter('promptType', i) as string;
						const fieldsStr = this.getNodeParameter('promptFields', i, '{}') as string;

						let fields = {};
						if (fieldsStr) {
							try {
								fields = JSON.parse(fieldsStr);
							} catch (error) {
								throw new NodeOperationError(
									this.getNode(),
									'Additional fields must be valid JSON',
									{ itemIndex: i },
								);
							}
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'POST',
								baseURL: baseUrl,
								url: '/prompt-management/prompts',
								body: {
									name,
									content,
									type,
									...fields,
								},
							},
						);
					} else if (operation === 'update') {
						const promptId = this.getNodeParameter('promptIdParam', i) as string;
						const fieldsStr = this.getNodeParameter('promptFields', i, '{}') as string;

						let fields = {};
						try {
							fields = JSON.parse(fieldsStr);
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								'Update fields must be valid JSON',
								{ itemIndex: i },
							);
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'PUT',
								baseURL: baseUrl,
								url: `/prompt-management/prompts/${promptId}`,
								body: fields,
							},
						);
					} else if (operation === 'delete') {
						const promptId = this.getNodeParameter('promptIdParam', i) as string;
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'DELETE',
								baseURL: baseUrl,
								url: `/prompt-management/prompts/${promptId}`,
							},
						);
					}
				}

				// =====================================================
				// SCHEMA RESOURCE
				// =====================================================
				else if (resource === 'schema') {
					if (operation === 'getAll') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: '/schema-management/schemas',
							},
						);
					} else if (operation === 'get') {
						const schemaId = this.getNodeParameter('schemaIdParam', i) as string;
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: `/schema-management/schemas/${schemaId}`,
							},
						);
					} else if (operation === 'create') {
						const name = this.getNodeParameter('schemaName', i) as string;
						const definitionStr = this.getNodeParameter('schemaDefinition', i) as string;
						const fieldsStr = this.getNodeParameter('schemaFields', i, '{}') as string;

						let definition = [];
						try {
							definition = JSON.parse(definitionStr);
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								'Schema definition must be valid JSON',
								{ itemIndex: i },
							);
						}

						let additionalFields: any = {};
						if (fieldsStr) {
							try {
								additionalFields = JSON.parse(fieldsStr);
							} catch (error) {
								throw new NodeOperationError(
									this.getNode(),
									'Additional fields must be valid JSON',
									{ itemIndex: i },
								);
							}
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'POST',
								baseURL: baseUrl,
								url: '/schema-management/schemas',
								body: {
									name,
									fields: definition,
									description: additionalFields.description || '',
									schemaType: additionalFields.schemaType || 'enrichment',
								},
							},
						);
					} else if (operation === 'update') {
						const schemaId = this.getNodeParameter('schemaIdParam', i) as string;
						const fieldsStr = this.getNodeParameter('schemaFields', i, '{}') as string;

						let updateFields = {};
						try {
							updateFields = JSON.parse(fieldsStr);
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								'Update fields must be valid JSON',
								{ itemIndex: i },
							);
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'PUT',
								baseURL: baseUrl,
								url: `/schema-management/schemas/${schemaId}`,
								body: updateFields,
							},
						);
					} else if (operation === 'delete') {
						const schemaId = this.getNodeParameter('schemaIdParam', i) as string;
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'DELETE',
								baseURL: baseUrl,
								url: `/schema-management/schemas/${schemaId}`,
							},
						);
					}
				}

				// =====================================================
				// USER RESOURCE
				// =====================================================
				else if (resource === 'user') {
					if (operation === 'getInfo') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: '/userinfo/me',
							},
						);
					}
				}

				// =====================================================
				// WEBHOOK RESOURCE
				// =====================================================
				else if (resource === 'webhook') {
					if (operation === 'getAll') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: '/webhooks',
							},
						);
					} else if (operation === 'get') {
						const webhookId = this.getNodeParameter('webhookIdParam', i) as string;
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'GET',
								baseURL: baseUrl,
								url: `/webhooks/${webhookId}`,
							},
						);
					} else if (operation === 'create') {
						const name = this.getNodeParameter('webhookName', i) as string;
						const callbackUrl = this.getNodeParameter('webhookCallbackUrl', i) as string;
						const eventTypesStr = this.getNodeParameter('webhookEventTypes', i) as string;
						const providerType = this.getNodeParameter('webhookProviderType', i) as string;
						const fieldsStr = this.getNodeParameter('webhookFields', i, '{}') as string;

						const eventTypes = eventTypesStr.split(',').map((type) => type.trim());

						let fields = {};
						if (fieldsStr) {
							try {
								fields = JSON.parse(fieldsStr);
							} catch (error) {
								throw new NodeOperationError(
									this.getNode(),
									'Additional fields must be valid JSON',
									{ itemIndex: i },
								);
							}
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'POST',
								baseURL: baseUrl,
								url: '/webhooks',
								body: {
									name,
									callback_url: callbackUrl,
									event_types: eventTypes,
									provider_type: providerType,
									...fields,
								},
							},
						);
					} else if (operation === 'update') {
						const webhookId = this.getNodeParameter('webhookIdParam', i) as string;
						const fieldsStr = this.getNodeParameter('webhookFields', i, '{}') as string;

						let fields = {};
						try {
							fields = JSON.parse(fieldsStr);
						} catch (error) {
							throw new NodeOperationError(
								this.getNode(),
								'Update fields must be valid JSON',
								{ itemIndex: i },
							);
						}

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'PUT',
								baseURL: baseUrl,
								url: `/webhooks/${webhookId}`,
								body: fields,
							},
						);
					} else if (operation === 'delete') {
						const webhookId = this.getNodeParameter('webhookIdParam', i) as string;
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'neoApi',
							{
								method: 'DELETE',
								baseURL: baseUrl,
								url: `/webhooks/${webhookId}`,
							},
						);
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

