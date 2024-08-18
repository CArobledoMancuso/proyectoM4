import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@ApiTags('order-details') // Etiqueta para agrupar las rutas en Swagger
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo detalle de pedido' }) // Descripción de la operación
  @ApiResponse({
    status: 201,
    description: 'El detalle del pedido ha sido creado exitosamente',
    type: CreateOrderDetailDto, // Tipo de respuesta esperada
  })
  @ApiBody({ type: CreateOrderDetailDto }) // Tipo de cuerpo de la solicitud
  async create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return await this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los detalles de pedidos' }) // Descripción de la operación
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los detalles de pedidos',
    type: [CreateOrderDetailDto], // Tipo de respuesta esperada
  })
  findAll() {
    return this.orderDetailsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un detalle de pedido por ID' }) // Descripción de la operación
  @ApiParam({
    name: 'id',
    description: 'ID del detalle del pedido a obtener',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'El detalle del pedido correspondiente al ID proporcionado',
    type: CreateOrderDetailDto, // Tipo de respuesta esperada
  })
  @ApiResponse({
    status: 404,
    description: 'Detalle del pedido no encontrado',
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const orderDetail = await this.orderDetailsService.findOne(id);
    if (!orderDetail) {
      throw new HttpException('Order detail not found', HttpStatus.NOT_FOUND);
    }
    return orderDetail;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un detalle de pedido por ID' }) // Descripción de la operación
  @ApiParam({
    name: 'id',
    description: 'ID del detalle del pedido a actualizar',
    type: String,
  })
  @ApiBody({ type: UpdateOrderDetailDto }) // Tipo de cuerpo de la solicitud
  @ApiResponse({
    status: 200,
    description: 'El detalle del pedido ha sido actualizado exitosamente',
    type: CreateOrderDetailDto, // Tipo de respuesta esperada
  })
  @ApiResponse({
    status: 404,
    description: 'Detalle del pedido no encontrado',
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    const orderDetail = await this.orderDetailsService.findOne(id);
    if (!orderDetail) {
      throw new HttpException('Order detail not found', HttpStatus.NOT_FOUND);
    }
    return await this.orderDetailsService.update(id, updateOrderDetailDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un detalle de pedido por ID' }) // Descripción de la operación
  @ApiParam({
    name: 'id',
    description: 'ID del detalle del pedido a eliminar',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'El detalle del pedido ha sido eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Detalle del pedido no encontrado',
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const orderDetail = await this.orderDetailsService.findOne(id);
    if (!orderDetail) {
      throw new HttpException('Order detail not found', HttpStatus.NOT_FOUND);
    }
    return await this.orderDetailsService.remove(id);
  }
}
