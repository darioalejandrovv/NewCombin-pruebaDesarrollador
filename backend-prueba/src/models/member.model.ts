import {Entity, model, property} from '@loopback/repository';

@model()
export class Member extends Entity {

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  ssn: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;


  constructor(data?: Partial<Member>) {
    super(data);
  }
}

export interface MemberRelations {
  // describe navigational properties here
}

export type MemberWithRelations = Member & MemberRelations;
