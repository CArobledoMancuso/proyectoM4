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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('orders') // Etiqueta para agrupar las rutas en Swagger
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' }) // Descripción de la operación
  @ApiResponse({
    status: 201,
    description: 'El pedido ha sido creado exitosamente',
    type: CreateOrderDto, // Tipo de respuesta esperada
  })
  @ApiBody({ type: CreateOrderDto }) // Tipo de cuerpo de la solicitud
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pedidos' }) // Descripción de la operación
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los pedidos',
    type: [CreateOrderDto], // Tipo de respuesta esperada
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido por ID' }) // Descripción de la operación
  @ApiParam({
    name: 'id',
    description: 'ID del pedido a obtener',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'El pedido correspondiente al ID proporcionado',
    type: CreateOrderDto, // Tipo de respuesta esperada
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido no encontrado',
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un pedido por ID' }) // Descripción de la operación
  @ApiParam({
    name: 'id',
    description: 'ID del pedido a actualizar',
    type: String,
  })
  @ApiBody({ type: UpdateOrderDto }) // Tipo de cuerpo de la solicitud
  @ApiResponse({
    status: 200,
    description: 'El pedido ha sido actualizado exitosamente',
    type: CreateOrderDto, // Tipo de respuesta esperada
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido no encontrado',
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return await this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pedido por ID' }) // Descripción de la operación
  @ApiParam({
    name: 'id',
    description: 'ID del pedido a eliminar',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'El pedido ha sido eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido no encontrado',
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return await this.ordersService.remove(id);
  }
}
