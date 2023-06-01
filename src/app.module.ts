
import { Module, CacheModule } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import * as redisStore from 'cache-manager-redis-store'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';


@Module({
  imports: [CacheModule.register({
    store: redisStore,
    host: 'localhost',
    port: 6379
}), MongooseModule.forRoot("mongodb+srv://nesthood:Abc234@cluster0.0yrokzn.mongodb.net/nesthood?retryWrites=true&w=majority"),PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

