"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyUserService = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const security_1 = require("@loopback/security");
const bcryptjs_1 = require("bcryptjs");
const user_repository_1 = require("../../../repositories/user.repository");
let MyUserService = class MyUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async verifyCredentials(credentials) {
        const invalidCredentialsError = 'Invalid email or password.';
        const foundUser = await this.userRepository.findOne({
            where: { email: credentials.email },
        });
        if (!foundUser) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        const credentialsFound = await this.userRepository.findCredentials(foundUser.id);
        if (!credentialsFound) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        const passwordMatched = await (0, bcryptjs_1.compare)(credentials.password, credentialsFound.password);
        if (!passwordMatched) {
            throw new rest_1.HttpErrors.Unauthorized(invalidCredentialsError);
        }
        return foundUser;
    }
    convertToUserProfile(user) {
        return {
            [security_1.securityId]: user.id.toString(),
            name: user.username,
            id: user.id,
            email: user.email,
        };
    }
};
MyUserService = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(user_repository_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [user_repository_1.UserRepository])
], MyUserService);
exports.MyUserService = MyUserService;
//# sourceMappingURL=user.service.js.map