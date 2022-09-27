import { Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { User } from './user.mongo.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}

  async createOrSave(user) {
    return this.userRepository.save(user);
  }

  async createOrUpdateByFeishu(feishuInfo) {
    return await this.userRepository.save(feishuInfo);
  }
}
