import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query, params } = req;
    const userAgent = req.get('user-agent') || '';

    this.logger.log(`Request - Method: ${method}, URL: ${originalUrl}, User-Agent: ${userAgent}`);
    this.logger.log(`Request Body: ${JSON.stringify(body)}`);
    this.logger.log(`Request Query: ${JSON.stringify(query)}`);
    this.logger.log(`Request Params: ${JSON.stringify(params)}`);

    next();
  }
}
