import { InstanceModel } from "../Models/InstanceModel";
import { Exception } from "../Exception";
import * as jwt from 'jsonwebtoken';

export class InstanceValidator implements Exception {
    type: string = this.constructor.name;;
    status: number;
    name: string;
    message: string;

    constructor () {}

    public ExceptionResponse(error: any, res: any): void {
        new Exception(this.type, error.message, error.status).ExceptionResponse(error, res);
    }

    public HasUsernameAndPassword(instance: InstanceModel): void {
        if (instance.username == null || instance.password == null)
            throw new Exception(this.type, 'Missing: username or / and password!', 400)
    }

    public IsUniqueUsername(instance: InstanceModel, instances: InstanceModel[]): void {
        if (instances.find(i => i.username == instance.username) != null)
            throw new Exception(this.type, 'Username already exists!', 400)
    }

    public IsValidInstance(instance: InstanceModel, instances: InstanceModel[], IsValidateToken: boolean): boolean {
        var found: boolean = false

        instances.forEach(i => {
            if (i.username == instance.username && i.password == instance.password)
                found = true
        })

        if(!found && !IsValidateToken)
            throw new Exception(this.type, 'Invalid credentials!', 400)

        return found
    }

    public IsValidToken(req: any, instances: InstanceModel[]): InstanceModel {
        var instanceModel: InstanceModel = null

        if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1)
            throw new Exception(this.type, 'Missing Bearer Authorization Header', 401)

        var tokenDecoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.PRIVATE_KEY)

        if(typeof tokenDecoded === 'string'){
            throw new Exception(this.type, 'Invalid token!', 401)
        }
        else{
            instanceModel = new InstanceModel(tokenDecoded.data.username, tokenDecoded.data.password)
        }

        if(!this.IsValidInstance(instanceModel, instances, true))
            throw new Exception(this.type, 'Invalid token!', 401)
            
        return instanceModel        
    }

    public GetInstance(instance: InstanceModel, instances: InstanceModel[]): InstanceModel {
        var instanceModel: InstanceModel = null

        instances.forEach(i => {
            if (i.username == instance.username && i.password == instance.password)
                instanceModel = i
        })

        if(instanceModel == null)
            throw new Exception(this.type, 'Invalid credentials!', 400)

        return instanceModel
    }

}