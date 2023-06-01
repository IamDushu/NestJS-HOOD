import {
  Controller,
  Post,
  Body,
  Get,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Feed } from './post.model';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  async addPost(
    @Body('userId') userId: Number,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('description') description: string,
  ) {
      const generatedPost = await this.postsService.insertPost(
        userId,
        firstName,
        lastName,
        description,
      );
      const data = await this.cacheManager.get<Array<Feed>>("allPosts")
      if(data === null){
        await this.cacheManager.set('allPosts', generatedPost , { ttl: 30 });
        return generatedPost;
      }
      data.push(generatedPost)
      await this.cacheManager.set('allPosts', data , { ttl: 30 });
      return generatedPost;
    }    

  @Get()
  async getAllPosts() {
    const posts = await this.cacheManager.get<Feed>('allPosts');
    if (posts) {
      return {
        data: posts,
        LoadFrom: 'redis cache',
      };
    } else {
      const result = await this.postsService.getAllPosts();
      await this.cacheManager.set('allPosts', result , { ttl: 30 });
      return {
        data: result,
        LoadFrom: 'Database',
      };
    }
  }

  @Get('user')
  async getPost(@Body('userId') userId: Number) {
    const post = await this.cacheManager.get<Feed>(`${userId}`);
    if (post) {
      return {
        data: post,
        LoadFrom: 'redis cache',
      };
    } else {
      const result = await this.postsService.getUserPosts(userId);
      await this.cacheManager.set(`${userId}`, result, { ttl: 30 });
      return {
        data: result,
        LoadFrom: 'Database',
      };
    }
  }

}
