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
    jsonSchema: {
      minLength: 3, //Longitud mínima
      maxLength: 20, //Longitud máxima
      pattern: '^[a-zA-Z]+$' //solo letras
    }
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 3, //Longitud mínima
      maxLength: 30, //Longitud máxima
      pattern: '^[a-zA-A]+$', //Solo letras
    }
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
