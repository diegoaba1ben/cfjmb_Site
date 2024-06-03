import {Entity, model, property} from '@loopback/repository';

@model()
export class GatewayData extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  constructor(data?: Partial<GatewayData>) {
    super(data);
  }
}

export interface GatewayDataRelations {
  // describe navigational properties here
}

export type GatewayDataWithRelations = GatewayData & GatewayDataRelations;
