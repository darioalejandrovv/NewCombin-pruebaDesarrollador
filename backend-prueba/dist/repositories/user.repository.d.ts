import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { User, UserCredentials, UserRelations } from '../models';
import { UserCredentialsRepository } from './user-credentials.repository';
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id, UserRelations> {
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>;
    readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;
    constructor(dataSource: DbDataSource, userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>);
    findCredentials(userId: typeof User.prototype.id): Promise<UserCredentials | undefined>;
}
