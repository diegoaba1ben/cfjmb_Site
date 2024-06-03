import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GateDbDataSource} from '../datasources';
import {GatewayData, GatewayDataRelations} from '../models';

export class GatewayDataRepository extends DefaultCrudRepository<
  GatewayData,
  typeof GatewayData.prototype.id,
  GatewayDataRelations
> {
  constructor(
    @inject('datasources.gateDb') dataSource: GateDbDataSource,
  ) {
    super(GatewayData, dataSource);
  }
}
