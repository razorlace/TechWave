import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',               
      host: 'localhost',           
      port: 3306,                  
      username: 'root',            
      password: '',                
      database: 'movies_db',       
      autoLoadEntities: true,      
      synchronize: true,
      
    }),
    MoviesModule,
    GenresModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // Aplica o LoggerMiddleware globalmente
      .forRoutes('*'); // O middleware será aplicado a todas as rotas
  }
}
