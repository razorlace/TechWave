// src/common/middleware/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';  // Importa as funcionalidades de Middleware do NestJS
import { Request, Response } from 'express'; // Importa os tipos de Request e Response do Express

// Define o LoggerMiddleware como um serviço injetável
@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  // A função 'use' será executada em todas as requisições recebidas
  use(req: Request, res: Response, next: Function) {

    // Imprime no console a data/hora da requisição, o método HTTP e o URL acessado
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);

    // Chama o próximo middleware ou controladores na cadeia
    next();
  }
}
