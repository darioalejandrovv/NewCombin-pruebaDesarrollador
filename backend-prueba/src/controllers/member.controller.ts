import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Member} from '../models';
import {MemberRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';


const RESOURCE_NAME = 'member';
const ACL_MEMBER = {
  'post': {
    resource: `${RESOURCE_NAME}*`,
    scopes: ['post'],
    allowedRoles: ['admin'],
  },
  'patch': {
    resource: `${RESOURCE_NAME}*`,
    scopes: ['patch'],
    allowedRoles: ['admin'],
  },
  'delete': {
    resource: `${RESOURCE_NAME}*`,
    scopes: ['delete'],
    allowedRoles: ['admin'],
  }
};

export class MemberController {
  constructor(
    @repository(MemberRepository)
    public memberRepository : MemberRepository,
  ) {}

  @post('/api/members')
  @response(200, {
    description: 'Member model instance',
    content: {'application/json': {schema: getModelSchemaRef(Member)}},
  })
  @authenticate('jwt')
  @authorize(ACL_MEMBER['post'])
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Member, {
            title: 'NewMember',

          }),
        },
      },
    })
    member: Member,
  ): Promise<Member> {
    class MemberService {
      constructor (){
      }
      validSSN (ssn:any){
        const regex = /^\d{3}-\d{2}-\d{4}$/;
        if (regex.test(ssn) === false) {
          return false
        }
        else {
          return true
        }
      }
      validString(item:any) {
        const itemTrim = item.trim()
        if (typeof item === "string" && item.trim().length > 0 && (item.length===itemTrim.length))
        {
          return true
        }
        else {return false}

      }

    }

    const memberService = new MemberService()


    if(memberService.validSSN(member.ssn) && memberService.validString(member.firstName) && memberService.validString(member.lastName) && memberService.validString(member.address)  ){
      return this.memberRepository.create(member);
    }
    else {
      throw new Error('Invalid imput parameters')
    }
  }

  @get('/api/members/count')
  @response(200, {
    description: 'Member model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Member) where?: Where<Member>,
  ): Promise<Count> {
    return this.memberRepository.count(where);
  }

  @get('/api/members')
  @response(200, {
    description: 'Array of Member model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Member, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Member) filter?: Filter<Member>,
  ): Promise<Member[]> {
    return this.memberRepository.find(filter);
  }

  @patch('/api/members')
  @authenticate('jwt')
  @authorize(ACL_MEMBER['patch'])
  @response(200, {
    description: 'Member PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Member, {partial: true}),
        },
      },
    })
    member: Member,
    @param.where(Member) where?: Where<Member>,
  ): Promise<Count> {
    return this.memberRepository.updateAll(member, where);
  }

  @get('/api/members/{id}')
  @response(200, {
    description: 'Member model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Member, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Member, {exclude: 'where'}) filter?: FilterExcludingWhere<Member>
  ): Promise<Member> {
    return this.memberRepository.findById(id, filter);
  }

  @patch('/api/members/{id}')
  @authenticate('jwt')
  @authorize(ACL_MEMBER['patch'])
  @response(204, {
    description: 'Member PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Member, {partial: true}),
        },
      },
    })
    member: Member,
  ): Promise<void> {
    await this.memberRepository.updateById(id, member);
  }

  @del('/api/members/{id}')
  @authenticate('jwt')
  @authorize(ACL_MEMBER['delete'])
  @response(204, {
    description: 'Member DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.memberRepository.deleteById(id);
  }
}
