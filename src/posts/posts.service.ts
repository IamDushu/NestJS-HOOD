// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import * as redis from 'redis';
// import { promisify } from 'util';
// import { Post } from './post.model';

// @Injectable()
// export class PostsService {
//   private redisClient;
//   private getAsync;

//   constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {
//     this.redisClient = redis.createClient(); // create Redis client
//     this.getAsync = promisify(this.redisClient.get).bind(this.redisClient); // promisify Redis `get` method
//   }

//   async insertPost(userId: Number, firstName: String, lastName: String, description: String) {
//     const newPost = new this.postModel({ userId, firstName, lastName, description });
//     const result = await newPost.save();
//     // update Redis cache with new post
//     this.redisClient.set(result._id.toString(), JSON.stringify(result));
//     return result._id;
//   }

//   async getAllPosts() {
//     // try to get posts from Redis cache
//     const cachedPosts = await this.getAsync('allPosts');
//     if (cachedPosts) {
//       return JSON.parse(cachedPosts);
//     }
//     // if not in cache, get from MongoDB and update Redis cache
//     const posts = await this.postModel.find().exec();
//     this.redisClient.set('allPosts', JSON.stringify(posts));
//     return posts;
//   }

//   async getUserPosts(userId: Number) {
//     // try to get user posts from Redis cache
//     const cachedPosts = await this.getAsync(`userPosts:${userId}`);
//     if (cachedPosts) {
//       return JSON.parse(cachedPosts);
//     }
//     // if not in cache, get from MongoDB and update Redis cache
//     const posts = await this.postModel.find({ userId }).exec();
//     if (!posts.length) {
//       throw new NotFoundException('Could not find Posts!');
//     }
//     this.redisClient.set(`userPosts:${userId}`, JSON.stringify(posts));
//     return posts;
//   }
// }



import {Injectable, NotFoundException } from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose'

import {Feed} from "./post.model"

@Injectable()
export class PostsService {


    constructor(@InjectModel('Post') private readonly postModel: Model<Feed>) {}

    async insertPost(userId: Number, firstName: string, lastName: string, description: String) {
        const newPost = new this.postModel({userId, firstName, lastName, description})
        const result = await newPost.save()
        return result
    }

    async getAllPosts() {
        const posts = await this.postModel.find().exec()
        return posts
    }

    async getUserPosts(userId: Number){
        const post = await this.postModel.find({userId: userId})
        if(!post.length) {
            throw new NotFoundException('Could not find Posts!');
        }
        return post
    }
}