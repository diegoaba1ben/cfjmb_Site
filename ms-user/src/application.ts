import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {CfjmbDbDataSource} from './datasources'; // Importa el datasource
import {MySequence} from './sequence';

export class MsUserApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Configura el datasource
    this.dataSource(CfjmbDbDataSource, 'datasources.config.cfjmbDb');

    // Configura la secuencia personalizada
    this.sequence(MySequence);

    // Configura la página de inicio predeterminada
    this.static('/', path.join(__dirname, '../public'));

    // Personaliza las convenciones de Booter de @loopback/boot
    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
export {ApplicationConfig};

