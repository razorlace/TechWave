import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'; // Importa os módulos principais do NestJS, como Module (para definir módulos) e MiddlewareConsumer (para configurar middlewares)
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa o TypeOrmModule para conectar a aplicação com o banco de dados MySQL
import { LoggerMiddleware } from './common/middleware/logger.middleware'; // Importa o middleware de logger customizado que será usado nas rotas
import { MoviesModule } from './movies/movies.module'; // Importa o módulo de filmes
import { GenresModule } from './genres/genres.module'; // Importa o módulo de gêneros

@Module({
  imports: [ // Define os módulos que serão importados na aplicação, eles são responsáveis por encapsular a funcionalidade da aplicação
    TypeOrmModule.forRoot({ // Configura a conexão com o banco de dados utilizando TypeORM
      type: 'mysql',                // Define o tipo de banco de dados como MySQL
      host: 'localhost',            // Define o host como localhost
      port: 3306,                   // Define a porta padrão para conexão com o MySQL
      username: 'root',             // Define o usuário para autenticação no MySQL
      password: '',                 // Define a senha para o usuário
      database: 'movies_db2',       // Nome do banco de dados a ser utilizado
      autoLoadEntities: true,       // Faz o carregamento automático das entidades definidas, ou seja, as tabelas do banco de dados
      synchronize: true,            // Sincroniza o banco de dados com as alterações nas entidades, gerando as tabelas automaticamente
    }),
    MoviesModule, // Módulo responsável pelas funcionalidades relacionadas aos filmes
    GenresModule, // Módulo responsável pelas funcionalidades relacionadas aos gêneros de filmes
  ],
})
export class AppModule implements NestModule { // Define a classe do módulo principal da aplicação, que importa os outros módulos
  configure(consumer: MiddlewareConsumer) { // Método usado para configurar middlewares
    consumer
      .apply(LoggerMiddleware) // Aplica o LoggerMiddleware, que irá registrar informações dos requests recebidos
      .forRoutes('*'); // O middleware será aplicado a todas as rotas definidas na aplicação
  }
}
