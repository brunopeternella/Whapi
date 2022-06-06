import { Express } from "express-serve-static-core";
import { Exception } from "../Exception";
import { IApiController } from "../Interfaces/IApiController";
import { InstanceModel } from "../Models/InstanceModel";
import { InstanceValidator } from "../Validators/InstanceValidator";

export class MessageController implements IApiController{
    type: string = this.constructor.name;
    status: number;
    name: string;
    message: string;
    stack?: string;
    
    public ExceptionResponse(error: any, res: any): void {
        new Exception(this.type, error.message, error.status).ExceptionResponse(error, res);
    }

    EndPoints(app: Express, instances: InstanceModel[]): void {

        app.post('/send-text', (req, res) => {
            try {
                var instanceModel: InstanceModel = InstanceValidator.prototype.IsValidToken(req, instances);
                
                var instance: InstanceModel

                instance = InstanceValidator.prototype.GetInstance(instanceModel, instances);

                instance.client
                    .sendText(`${req.body.phone}@g.us`, req.body.text)
                    .then((result) => {                        
                        return res.status(200).json(result);
                    })
                    .catch((err) => {
                        this.ExceptionResponse(err, res);
                    });

            } catch (error) {
                this.ExceptionResponse(error, res);
            }

            /* Swagger
                #swagger.tags = ['Message']
                #swagger.description = 'Send a text to destinatary'
                

                #swagger.requestBody = {
                    description: 'Define the phone and text to send',
                    required: true,
                    schema: {$ref: "#/components/schemas/SendTextModel"}
                }
    
                #swagger.responses[200] = {
                    description: "The message has been sent",
                    schema: {$ref: "#/components/schemas/SendTextResponseModel"}
                }
    
                #swagger.responses[400] = { 
                    description: "Bad Request",
                    schema: {$ref: "#/components/schemas/BadRequest"}
                }           
            */
        })

    }
}