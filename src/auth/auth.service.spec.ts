import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { Role } from 'src/user/enum/role.enum';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockUserService: Partial<UserService> = {
      findByEmail: () => Promise.resolve(undefined),
      create: (entityLike?: Partial<User>) =>
        Promise.resolve({
          ...entityLike,
          administrator: 'user',
          id: '1234fs-1234fs-1234fs-1234fs',
        } as User),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {}, // Aquí puedes proporcionar un objeto mock para UserRepository
        },
        {
          provide: JwtService,
          useValue: {}, // Aquí puedes proporcionar un objeto mock para JwtService
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  const mockUser = new SignUpAuthDto({
    name: 'John Doe',
    createdAt: '26/02/2024',
    password: '123456',
    passwordConfirm: '123456',
    email: 'johndou@email.com',
    address: 'Fake St. 123',
    phone: '123456789',
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('signUp() create a new user with encrypted password', async () => {
    const user = await service.signUp(mockUser);
    console.log(user);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('administrator', Role.User);
    expect(user).toHaveProperty('password');
  });
});