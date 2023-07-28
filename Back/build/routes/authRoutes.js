"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const token_1 = require("./token");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.signUp();
        this.logIn();
        this.token();
    }
    signUp() {
        this.router.post('/signup', authController_1.authController.signUp);
    }
    logIn() {
        this.router.post('/login', authController_1.authController.logIn);
    }
    token() {
        this.router.get('/validate', token_1.validateToken);
        this.router.get('/invalidate', token_1.invalidateToken);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
