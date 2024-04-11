import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger.middleware';
import { LoggingInterceptor } from './logging.interceptors';
import { TransformInterceptor } from './transform.interceptors';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { Request, Response } from 'express';
import { CatsService } from './cats.service';

async function bootstrap() {
  try {
    const app: INestApplication = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(new LoggerMiddleware().use);
    app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());

    const catsService = app.get(CatsService);

    app.post('/cats', async (req: Request, res: Response) => {
      const catData = req.body;
      const createdCat = await catsService.createCat(catData);
      res.status(201).json(createdCat);
    });

    app.get('/cats/:id', async (req: Request, res: Response) => {
      const catId = req.params.id;
      const cat = await catsService.getCatById(catId);
      if (cat) {
        res.json(cat);
      } else {
        res.status(404).json({ error: 'Cat not found' });
      }
    });

    app.put('/cats/:id', async (req: Request, res: Response) => {
      const catId = req.params.id;
      const updateData = req.body;
      const updatedCat = await catsService.updateCat(catId, updateData);
      if (updatedCat) {
        res.json(updatedCat);
      } else {
        res.status(404).json({ error: 'Cat not found' });
      }
    });

    app.delete('/cats/:id', async (req: Request, res: Response) => {
      const catId = req.params.id;
      const deletedCat = await catsService.deleteCat(catId);
      if (deletedCat) {
        res.json(deletedCat);
      } else {
        res.status(404).json({ error: 'Cat not found' });
      }
    });

    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (err) {
    console.error('Error starting the application:', err);
  }
}

bootstrap();