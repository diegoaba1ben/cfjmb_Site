import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'gateDb',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: '',
  password: 'Ad-CfjmB-01',
  database: ''
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class GateDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'gateDb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.gateDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}