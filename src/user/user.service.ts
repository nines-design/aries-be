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
    try {
      const result = await this.userRepository.save(user);

      console.log('res', result);
    } catch (error) {
      console.log('res1', error);
      throw error;
    }
  }
}
