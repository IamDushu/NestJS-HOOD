import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store'
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema } from './post.model';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [CacheModule.register({
    store: redisStore,
    host: 'localhost',
    port: 6379
}), MongooseModule.forFeature([{name: 'Post', schema: PostSchema}]) ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
