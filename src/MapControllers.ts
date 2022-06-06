import { Express } from "express-serve-static-core";
import { InstanceModel } from "./Models/InstanceModel";
import { InstanceController } from "./Controllers/InstanceController";
import { AuthenticationController } from "./Controllers/AuthenticationController";
import { MessageController } from "./Controllers/MessageController";

export class MapControllers {
    constructor(){}

    public Controllers(app: Express, instances: Array<InstanceModel>): void {
        InstanceController.prototype.EndPoints(app, instances);
        AuthenticationController.prototype.EndPoints(app, instances);
        MessageController.prototype.EndPoints(app, instances);
    }
}