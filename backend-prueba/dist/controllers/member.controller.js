"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
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
let MemberController = class MemberController {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async create(member) {
        class MemberService {
            constructor() {
            }
            validSSN(ssn) {
                const regex = /^\d{3}-\d{2}-\d{4}$/;
                if (regex.test(ssn) === false) {
                    return false;
                }
                else {
                    return true;
                }
            }
            validString(item) {
                const itemTrim = item.trim();
                if (typeof item === "string" && item.trim().length > 0 && (item.length === itemTrim.length)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        const memberService = new MemberService();
        if (memberService.validSSN(member.ssn) && memberService.validString(member.firstName) && memberService.validString(member.lastName) && memberService.validString(member.address)) {
            return this.memberRepository.create(member);
        }
        else {
            throw new Error('Invalid imput parameters');
        }
    }
    async count(where) {
        return this.memberRepository.count(where);
    }
    async find(filter) {
        return this.memberRepository.find(filter);
    }
    async updateAll(member, where) {
        return this.memberRepository.updateAll(member, where);
    }
    async findById(id, filter) {
        return this.memberRepository.findById(id, filter);
    }
    async updateById(id, member) {
        await this.memberRepository.updateById(id, member);
    }
    async deleteById(id) {
        await this.memberRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/api/members'),
    (0, rest_1.response)(200, {
        description: 'Member model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Member) } },
    }),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)(ACL_MEMBER['post']),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Member, {
                    title: 'NewMember',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Member]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/api/members/count'),
    (0, rest_1.response)(200, {
        description: 'Member model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Member)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/api/members'),
    (0, rest_1.response)(200, {
        description: 'Array of Member model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Member, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Member)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/api/members'),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)(ACL_MEMBER['patch']),
    (0, rest_1.response)(200, {
        description: 'Member PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Member, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Member)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Member, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/api/members/{id}'),
    (0, rest_1.response)(200, {
        description: 'Member model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Member, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Member, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/api/members/{id}'),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)(ACL_MEMBER['patch']),
    (0, rest_1.response)(204, {
        description: 'Member PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Member, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Member]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/api/members/{id}'),
    (0, authentication_1.authenticate)('jwt'),
    (0, authorization_1.authorize)(ACL_MEMBER['delete']),
    (0, rest_1.response)(204, {
        description: 'Member DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], MemberController.prototype, "deleteById", null);
MemberController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.MemberRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.MemberRepository])
], MemberController);
exports.MemberController = MemberController;
//# sourceMappingURL=member.controller.js.map