import { Express } from "express-serve-static-core";
import { Exception } from "../Exception";
import { IApiController } from "../Interfaces/IApiController";
import { InstanceModel } from "../Models/InstanceModel";
import { InstanceValidator } from "../Validators/InstanceValidator";

export class InstanceController implements IApiController{
    type: string = this.constructor.name;
    status: number;
    name: string;
    message: string;
    stack?: string;
    
    public ExceptionResponse(error: any, res: any): void {
        new Exception(this.type, error.message, error.status).ExceptionResponse(error, res);
    }

    EndPoints(app: Express, instances: InstanceModel[]): void {

        app.post('/instance', (req, res) => {
            try {
                var instanceModel = new InstanceModel(req.body.username, req.body.password);
                
                InstanceValidator.prototype.HasUsernameAndPassword(instanceModel);
                InstanceValidator.prototype.IsUniqueUsername(instanceModel, instances);

                instanceModel.CreateInstance(res);
                return
                //return res.status(204).send();
                return res.status(201).json({
                    message: "Instance created successfully",
                    link: "https://base64.guru/converter/decode/image",
                    base64QRCode: instanceModel.base64QRCode
                });
            } catch (error) {
                this.ExceptionResponse(error, res);
            }

            /* Swagger
                #swagger.tags = ['Instance']
                #swagger.description = 'Create a new instance.'
    
                #swagger.requestBody = {
                    description: 'Client credentials.',
                    required: true,
                    schema: {$ref: "#/components/schemas/CredentialModel"}
                }
    
                #swagger.responses[204] = {
                    description: 'The instance was created.',
                }
    
                #swagger.responses[400] = { 
                    description: "Bad Request",
                    schema: {$ref: "#/components/schemas/BadRequest"}
                }              
            */
        })

    }
}