"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const tslib_1 = require("tslib");
const application_1 = require("./application");
async function main(options = {}) {
    const app = new application_1.AccessControlApplication(options);
    await app.boot();
    await app.start();
    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    return app;
}
exports.main = main;
// re-exports for our benchmark, not needed for the tutorial itself
tslib_1.__exportStar(require("@loopback/rest"), exports);
tslib_1.__exportStar(require("./application"), exports);
tslib_1.__exportStar(require("./models"), exports);
tslib_1.__exportStar(require("./repositories"), exports);
// Start the server when loaded via `node .`
if (require.main === module) {
    // Run the application
    const config = {
        rest: {
            port: +((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8081),
            host: (_b = process.env.HOST) !== null && _b !== void 0 ? _b : 'localhost',
            openApiSpec: {
                // useful when used with OpenAPI-to-GraphQL to locate your application
                setServersFromRequest: true,
            },
        },
    };
    main(config).catch(err => {
        console.error('Cannot start the application.', err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map