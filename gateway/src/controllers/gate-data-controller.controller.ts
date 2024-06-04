import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {GatewayData} from '../models';
import {GatewayDataRepository} from '../repositories';

export class GateDataControllerController {
  constructor(
    @repository(GatewayDataRepository)
    public gatewayDataRepository: GatewayDataRepository,
  ) { }

  @post('/gateway-data')
  @response(200, {
    description: 'GatewayData model instance',
    content: {'application/json': {schema: getModelSchemaRef(GatewayData)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GatewayData, {
            title: 'NewGatewayData',
            exclude: ['id'],
          }),
        },
      },
    })
    gatewayData: Omit<GatewayData, 'id'>,
  ): Promise<GatewayData> {
    //Validación de status
    try {
      this.validateGatewayData(gatewayData); //llama la función de validación
      return await this.gatewayDataRepository.create(gatewayData);
    } catch (error) {
      //manejo de los errores de validación
      if (error instanceof HttpErrors.HttpError) {
        throw error;
      } else {
        throw new HttpErrors.BadRequest('Status no activo');
      }
    }

  }

  @get('/gateway-data/count')
  @response(200, {
    description: 'GatewayData model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(GatewayData) where?: Where<GatewayData>,
  ): Promise<Count> {
    return this.gatewayDataRepository.count(where);
  }

  @get('/gateway-data')
  @response(200, {
    description: 'Array of GatewayData model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GatewayData, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(GatewayData) filter?: Filter<GatewayData>,
  ): Promise<GatewayData[]> {
    return this.gatewayDataRepository.find(filter);
  }

  @patch('/gateway-data')
  @response(200, {
    description: 'GatewayData PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GatewayData, {partial: true}),
        },
      },
    })
    gatewayData: GatewayData,
    @param.where(GatewayData) where?: Where<GatewayData>,
  ): Promise<Count> {
    return this.gatewayDataRepository.updateAll(gatewayData, where);
  }

  @get('/gateway-data/{id}')
  @response(200, {
    description: 'GatewayData model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GatewayData, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(GatewayData, {exclude: 'where'}) filter?: FilterExcludingWhere<GatewayData>
  ): Promise<GatewayData> {
    return this.gatewayDataRepository.findById(id, filter);
  }

  @patch('/gateway-data/{id}')
  @response(204, {
    description: 'GatewayData PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GatewayData, {partial: true}),
        },
      },
    })
    gatewayData: GatewayData,
  ): Promise<void> {
    await this.gatewayDataRepository.updateById(id, gatewayData);
  }

  @put('/gateway-data/{id}')
  @response(204, {
    description: 'GatewayData PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() gatewayData: GatewayData,
  ): Promise<void> {
    await this.gatewayDataRepository.replaceById(id, gatewayData);
  }

  @del('/gateway-data/{id}')
  @response(204, {
    description: 'GatewayData DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.gatewayDataRepository.deleteById(id);
  }
  //Sección de validación
  private validateGatewayData(gatewayData: GatewayData): void {
    if (gatewayData.status === null || gatewayData.status === undefined) {
      throw new HttpErrors.BadRequest('El campo status no debe ser nulo o undefined');
    }
    if (gatewayData.status !== true) {
      throw new HttpErrors.BadRequest('El campo status debe ser true');
    }
  }
}
