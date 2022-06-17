import { Express } from "express-serve-static-core";
import { Exception } from "../Exception";
import { IApiController } from "../Interfaces/IApiController";
import { InstanceModel } from "../Models/InstanceModel";
import { InstanceValidator } from "../Validators/InstanceValidator";
import * as jwt from 'jsonwebtoken';
require('dotenv').config('../../.env');

export class AuthenticationController implements IApiController {
    type: string = this.constructor.name;
    status: number;
    name: string;
    message: string;
    stack?: string;

    public ExceptionResponse(error: any, res: any): void {
        new Exception(this.type, error.message, error.status).ExceptionResponse(error, res);
    }

    EndPoints(app: Express, instances: InstanceModel[]): void {

        app.post('/token', (req, res) => {
            try {
                var instanceModel = new InstanceModel(req.body.username, req.body.password);

                InstanceValidator.prototype.IsValidInstance(instanceModel, instances, false);

                var token = jwt.sign({
                    data: {
                        username: req.body.username,
                        password: req.body.password
                    }
                }, process.env.PRIVATE_KEY, {
                    expiresIn: '24h'
                })

                return res.status(200).json({
                    access_token: token,
                    token_type: 'Bearer'
                });

            } catch (error) {
                this.ExceptionResponse(error, res);
            }

            /* Swagger
                #swagger.tags = ['Authentication']
                #swagger.description = 'Generate token'                
                
                #swagger.requestBody = {
                    description: 'Credentials to generate the token',
                    required: true,
                    schema: {$ref: "#/components/schemas/CredentialModel"}
                }
    
                #swagger.responses[200] = {
                    description: "Token generated",
                    schema: {$ref: "#/components/schemas/TokenModel"}
                }
    
                #swagger.responses[400] = { 
                    description: "Bad Request",
                    schema: {$ref: "#/components/schemas/BadRequest"}
                }
            */
        })

    }
}