import { InstanceModel } from '../Models/InstanceModel';
import { Express } from 'express-serve-static-core';
import { Exception } from '../Exception';

export interface IApiController extends Exception{
    EndPoints(app: Express, instances: Array<InstanceModel>): void;
}