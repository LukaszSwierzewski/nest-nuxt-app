import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: "keyboard cat", // put in env later
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge: 360000000}
    })
  )
  app.use(cookieParser())
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(cors({
    origin: [
      'http://localhost:8000'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
  }))
  await app.listen(3000);
}
bootstrap();
