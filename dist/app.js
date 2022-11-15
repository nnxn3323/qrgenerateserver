"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./config/db"));
require("dotenv/config");
const port = process.env.PORT || 5074;
const app = (0, express_1.default)();
(0, db_1.default)();
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.use(routes_1.default);
// error handler
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static("client/build"));
    app.get("*", (req, res) => {
        res.send("Hello World");
    });
}
app
    .listen(port, () => {
    console.log(`
    Server listening on port: 5000 
  `);
})
    .on("error", (err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=app.js.map