import { Entity } from '@loopback/repository';
export declare class Member extends Entity {
    firstName: string;
    ssn: string;
    lastName: string;
    address: string;
    constructor(data?: Partial<Member>);
}
export interface MemberRelations {
}
export declare type MemberWithRelations = Member & MemberRelations;
