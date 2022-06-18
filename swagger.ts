const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0'
});

const doc = {
    info: {
        version: '1.0.2', // by default: '1.0.0'
        title: 'Whappi API Documentation', // by default: 'REST API'
        description: 'API that allows you to send and receive messages from Whatsapp.', // by default: ''
    },
    host: '', // by default: 'localhost:3000'
    basePath: '', // by default: '/'
    schemes: [], // by default: ['http']
    consumes: [], // by default: ['application/json']
    produces: [], // by default: ['application/json']
    tags: [ // by default: empty Array
        {
            "name": "Authentication",
            "description": "Generate a JWT Token that will be used on API requests. First you need to have an Instance created."
        },
        {
            "name": "Message",
            "description": "Handle messages."
        },
        {
            "name": "Instance",
            "description": "Handle the client connection to the API."
        }
        // { ... }
    ],
    securityDefinitions: {}, // by default: empty object
    definitions: {}, // by default: empty object (Swagger 2.0)
    components: {
        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        },
        schemas: {
            CredentialModel: {
                username: 'username',
                password: 'password'
            },
            TokenModel: {
                access_token: "jwt token",
                token_type: "Bearer"
            },
            SendTextModel: {
                phone: "5568123456789",
                text: "sample text"
            },
            SendTextResponseModel: {
                message_id: "message id",
                status: "status",
                phone: "5568123456789",
                text: "sample text"
            },
            BadRequest: {
                error: {
                    type: "object",
                    details: "error detail",
                    status: 400
                }
            }
        }
    },
    "security": [{
        "bearerAuth": []
    }]

};;

const outputFile = './swagger-output.json';
const endpointsFiles = [
    './src/Controllers/MessageController.ts',
    './src/Controllers/InstanceController.ts',
    './src/Controllers/AuthenticationController.ts'
];

swaggerAutogen(outputFile, endpointsFiles, doc)
/*.then(() => {
    require('./app.ts');
});*/