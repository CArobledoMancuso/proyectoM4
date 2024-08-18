import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { hash, compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/user/enum/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInUser: SignInAuthDto) {
    const user = await this.userService.findByEmail(signInUser.email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isPasswordMatching = await compare(
      signInUser.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.createToken(user);
    return { token };
  }

  async signUp(signUpUser: SignUpAuthDto) {
    if (signUpUser.password !== signUpUser.passwordConfirm) {
      throw new HttpException('Passwords do not match', 400);
    }

    signUpUser.password = await hash(signUpUser.password, 10);
    return this.userService.create(signUpUser);
  }

  private async createToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.admin ? [Role.Admin] : [Role.User],
    };

    return this.jwtService.signAsync(payload);
  }
}
