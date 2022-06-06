const Express = require('express');
import * as swaggerUi from 'swagger-ui-express'
//import * as swaggerDocument from './swagger-output.json';
//const swaggerUi = require('swagger-ui-express')
import swaggerFile from './swagger-output.json';
//const MapControllers = require('./app/MapControllers')
import {
    InstanceModel
} from './src/Models/InstanceModel';
import { InstanceService } from './src/Services/InstanceService';
import { MapControllers } from './src/MapControllers';

var app = Express();
var instances: Array<InstanceModel> = []

InstanceService.prototype.LoadInstances(instances)

app.use(Express.json());
app.use(Express.urlencoded({
    extended: false
}));

MapControllers.prototype.Controllers(app, instances)

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + server.address().port);
});