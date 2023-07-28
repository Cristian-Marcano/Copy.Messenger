"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatsController_1 = require("../controllers/chatsController");
const token_1 = require("./token");
class ChatsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.search();
    }
    search() {
        this.router.get('/search/:searchUser', token_1.verifyToken, chatsController_1.chatsController.searchChat);
    }
}
const chatsRoutes = new ChatsRoutes();
exports.default = chatsRoutes.router;
