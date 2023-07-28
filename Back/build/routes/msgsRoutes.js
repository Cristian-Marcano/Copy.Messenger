"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const msgsController_1 = require("../controllers/msgsController");
const token_1 = require("./token");
class MsgsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.send();
        this.update();
        this.delete();
    }
    send() {
        // this.router.post('/send',validateToken,msgsController.sendMsgs);
    }
    update() {
        this.router.put('/update', token_1.validateToken, msgsController_1.msgsController.updateMsgs);
    }
    delete() { }
}
const msgsRoutes = new MsgsRoutes();
exports.default = msgsRoutes.router;
