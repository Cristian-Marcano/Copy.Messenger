"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profileController_1 = require("../controllers/profileController");
const token_1 = require("./token");
class ProfileRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.get();
        this.update();
    }
    get() {
        this.router.get('/', token_1.verifyToken, profileController_1.profileController.getProfile);
    }
    update() {
        this.router.put('/update', token_1.verifyToken, profileController_1.profileController.editProfile);
    }
}
const profileRoutes = new ProfileRoutes();
exports.default = profileRoutes.router;
