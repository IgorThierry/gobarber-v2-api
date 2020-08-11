import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindaAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findAllProviders(data: IFindaAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
