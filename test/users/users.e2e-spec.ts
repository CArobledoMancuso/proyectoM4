import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UserService } from 'src/user/user.service';
import { hash } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import * as request from 'supertest';
import { TypeOrmTestModule } from 'test/typeorm-testing-config';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let userService: UserService;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, TypeOrmTestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userService = moduleFixture.get<UserService>(UserService);

    const hashedPassword = await hash('123456', 10);
    jest.spyOn(userService, 'findByEmail').mockImplementation(async (email) => {
      if (email === 'johndou@email.com') {
        return Promise.resolve({
          email: 'johndou@email.com',
          password: hashedPassword,
          administrator: 'user',
        } as User);
      } else {
        return Promise.resolve(undefined);
      }
    });

    jest.spyOn(userService, 'findAll').mockImplementation(async () => {
      return Promise.resolve([
        {
          email: 'johndou@email.com',
          administrator: 'user',
        },
      ] as User[]);
    });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'johndou@email.com',
        password: '123456',
      });

    authToken = loginResponse.body['token'];
  });

  afterEach(async () => {
    await app.close();
  });

  it('/users (GET) Returns array with users and OK status code', async () => {
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`);
    console.log('Token', authToken);
    console.log('Request', req.body);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });
});
