import { Column, ObjectIdColumn } from 'typeorm';

export class User {
  @ObjectIdColumn()
  id?: number;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  username: string;

  @Column({ default: null })
  email: string;
}
