import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  UseInterceptors,
  Req,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { DateAdderInterceptor } from 'src/interceptors/date-adder/date-adder.interceptor';
import { Roles } from 'src/decorator/roles/roles.decorator';
import { Role } from './enum/role.enum';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { UserResponseDto } from './dto/response.user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('admins')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los administradores' })
  async findAllAdmins() {
    const admins = await this.userService.findAdmins();
    return admins.map(user => {
      const { password, admin, ...rest } = user;
      return new UserResponseDto(rest);
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin) // Sólo accesible por administradores
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  async findAll() {
    const users = await this.userService.findAll();
    return users.map(user => {
      const { password, admin, ...rest } = user;
      return new UserResponseDto(rest);
    });
  }

  @Get('pag')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener usuarios con paginación' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const users = await this.userService.pag(page, limit);
    return users.map(user => {
      const { password, ...rest } = user;
      return new UserResponseDto(rest);
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findOne(id);
    const { password, ...rest } = user;
    return new UserResponseDto(rest);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin) // Sólo accesible por administradores
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  @ApiBody({ type: UpdateUserDto })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return { id: updatedUser.id };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin) // Sólo accesible por administradores
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedUser = await this.userService.remove(id);
    return { id: deletedUser.id };
  }

  @Put(':id/admin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin) // Sólo accesible por administradores
  @ApiOperation({ summary: 'Asignar rol de administrador a un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  async assignAdminRole(@Param('id', new ParseUUIDPipe()) id: string) {
    const updatedUser = await this.userService.assignAdminRole(id);
    return { id: updatedUser.id, admin: updatedUser.admin };
  }
}
