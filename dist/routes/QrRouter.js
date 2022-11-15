"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const QrController_1 = require("../controllers/QrController");
const router = (0, express_1.Router)();
router.post("/qr", QrController_1.generateQr);
exports.default = router;
//# sourceMappingURL=QrRouter.js.map