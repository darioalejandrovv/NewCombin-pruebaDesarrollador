import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Member } from '../models';
import { MemberRepository } from '../repositories';
export declare class MemberController {
    memberRepository: MemberRepository;
    constructor(memberRepository: MemberRepository);
    create(member: Member): Promise<Member>;
    count(where?: Where<Member>): Promise<Count>;
    find(filter?: Filter<Member>): Promise<Member[]>;
    updateAll(member: Member, where?: Where<Member>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Member>): Promise<Member>;
    updateById(id: string, member: Member): Promise<void>;
    deleteById(id: string): Promise<void>;
}
