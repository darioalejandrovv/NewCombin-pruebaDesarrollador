import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Member, MemberRelations } from '../models';
export declare class MemberRepository extends DefaultCrudRepository<Member, typeof Member.prototype.ssn, MemberRelations> {
    constructor(dataSource: DbDataSource);
}
