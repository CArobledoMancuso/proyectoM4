import { UserResponseDto } from "src/user/dto/response.user.dto";
import { SignUpAuthDto } from "./dto/signup-auth.dto";
import { AuthController } from "./auth.controller";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { Test, TestingModule } from "@nestjs/testing";
import { hash } from "bcrypt";
import { User } from "src/user/entities/user.entity";

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const hashedPassword = await hash('123456', 10);
    const mockUserService: Partial<UserService> = {
      findByEmail: (email: string) => {
        if (email === 'johndou@email.com') {
          return Promise.resolve({
            id: '1234fs-1234fs-1234fs-1234fs',
            name: 'John Doe',
            email: 'johndou@email.com',
            password: hashedPassword,
            address: 'Fake St. 123',
            phone: '123456789',
            country: 'Country',
            city: 'City',
            admin: false,
            createdAt: new Date().toISOString(),
          } as User);
        } else {
          return Promise.resolve(undefined);
        }
      },
      create: (entityLike?: Partial<User>): Promise<User> =>
        Promise.resolve({
          id: '1234fs-1234fs-1234fs-1234fs',
          name: entityLike?.name || 'John Doe',
          email: entityLike?.email || 'johndou@email.com',
          password: hashedPassword,
          address: entityLike?.address || 'Fake St. 123',
          phone: entityLike?.phone || '123456789',
          country: entityLike?.country || 'Country',
          city: entityLike?.city || 'City',
          admin: entityLike?.admin || false,
          createdAt: new Date().toISOString(),
        } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {}, // Aquí puedes proporcionar un objeto mock para UserRepository
        },
        {
          provide: JwtService,
          useValue: { signAsync: () => Promise.resolve('mockJwtToken') }, // Aquí puedes proporcionar un objeto mock para JwtService
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  const mockSignUpUser = new SignUpAuthDto({
    name: 'John Doe',
    email: 'johndou@email.com',
    password: '123456',
    passwordConfirm: '123456',
    address: 'Fake St. 123',
    phone: '123456789',
    country: 'Country',
    city: 'City',
  });

  const mockSignInUser = new SignUpAuthDto({
    email: 'johndou@email.com',
    password: '123456',
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signUp() should return a new UserResponseDto and create User', async () => {
    const mockRequest = { date: new Date() };
    const user = await controller.signUp(mockSignUpUser, mockRequest);
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(UserResponseDto);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('admin');
  });

  it('signIn() should return a token', async () => {
    const token = await controller.signIn(mockSignInUser);
    console.log(token);
    expect(token).toBeDefined();
    expect(token).toHaveProperty('token');
  });
});