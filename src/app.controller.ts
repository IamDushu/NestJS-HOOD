import { Controller, Get, Inject, CACHE_MANAGER } from '@nestjs/common';
import {Cache} from 'cache-manager'
import { AppService } from './app.service';

@Controller()
export class AppController {
  fakeValue = "my name is Dushu"
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  
  @Get('get-string-cache')
  async getSimpleString(){
    var value = await this.cacheManager.get('my-string')
    if(value){
      return{
        data: value,
        LoadsFrom: 'redis cache'
      }
    }
    await this.cacheManager.set('my-string', this.fakeValue, {ttl:600})
    return{
      data: this.fakeValue,
      LoadsFrom: 'Fake Database'
    }
  }
  
  // constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
 