import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as dotenv from 'dotenv';
dotenv.config();

// Configuración del datasource
const config = {
  name: 'cfjmbDb',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: '',
  password: '',
  database: 'cfjmbDb' // Nombre de la base de datos
};

@lifeCycleObserver('datasource')
export class CfjmbDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'cfjmbDb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.cfjmbDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
