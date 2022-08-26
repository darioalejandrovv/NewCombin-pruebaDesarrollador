"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Member = class Member extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: false,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "ssn", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Member.prototype, "address", void 0);
Member = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Member);
exports.Member = Member;
//# sourceMappingURL=member.model.js.map