import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { DateAdderInterceptor } from 'src/interceptors/date-adder/date-adder.interceptor';
import { UserResponseDto } from 'src/user/dto/response.user.dto';

@ApiTags('auth') // Etiqueta para organizar los endpoints en Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Credenciales inválidas' })
  async signIn(@Body() credentials: SignInAuthDto) {
    return this.authService.signIn(credentials);
  }

  @Post('signup')
  @HttpCode(201)
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Registro exitoso de usuario',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Error al registrar usuario' })
  @UseInterceptors(DateAdderInterceptor)
  async signUp(@Body() signUpUser: SignUpAuthDto, @Req() request) {
    const user = { ...signUpUser, createdAt: request.date };
    const newUser = await this.authService.signUp(user);
    return new UserResponseDto(newUser);
  }

  @Get('auth0/protected')
  @ApiOperation({ summary: 'Obtener información de usuario desde Auth0' })
  @ApiResponse({
    status: 200,
    description: 'Información de usuario obtenida',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  getAuth0Protected(@Req() request) {
    console.log(JSON.stringify(request.oidc.idToken));
    return JSON.stringify(request.oidc.user);
  }
}
