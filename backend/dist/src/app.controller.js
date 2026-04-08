"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const nodemailer = __importStar(require("nodemailer"));
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return {
            status: 'success',
            message: 'Fleur Shop API is running successfully! 🌺'
        };
    }
    async requestOtp(body) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        try {
            await transporter.sendMail({
                from: '"Fleur Shop" <no-reply@fleur.com>',
                to: body.email,
                subject: 'Код авторизации на сайте Fleur Shop',
                text: `Ваш код для входа: ${code}`,
                html: `<p>Ваш код для входа:</p><h2>${code}</h2>`,
            });
            console.log(`OTP (${code}) successfully sent via Email to: ${body.email}`);
        }
        catch (error) {
            console.error('Ошибка отправки Email. Убедитесь, что EMAIL_USER и EMAIL_PASS указаны в .env', error);
            return { message: 'OTP sent in DEV mode', code: code };
        }
        return { message: 'OTP sent to ' + body.email, code: code };
    }
    async verifyOtp(body) {
        return { token: 'jwt-token-example', user: { email: body.email, role: 'USER' } };
    }
    globalProducts = [
        { id: 1, name: 'Royalty', price: 281300, imageUrl: '/images/roses_bouquet_1775641316261.png', category: 'kustovye-rozy', type: 'Моно-букет', color: 'Алый', composition: ['Кустовая роза'] },
        { id: 2, name: 'Sunset Reverie', price: 800000, imageUrl: '/images/peonies_bouquet_1775641302410.png', category: 'avtorskie', type: '', color: '', composition: [] },
        { id: 3, name: 'Hydrangeas 7', price: 33000, imageUrl: '/images/hero_flowers_1775641286421.png', category: 'gollandskie', type: '', color: 'Сиреневый', composition: [] },
        { id: 4, name: 'Julette 5.0', price: 71800, imageUrl: '/images/hatbox_flowers_1775641332248.png', category: 'kashpo', type: '', color: 'Алый', composition: ['Роза 40 см', 'Эвкалипт'] },
        { id: 5, name: 'Zhanym', price: 68000, imageUrl: '/images/dried_flowers_1775641363329.png', category: 'mono', type: 'Моно-букет', color: 'Сиреневый', composition: ['Джульетта'] },
    ];
    globalOrders = [];
    getProducts() {
        return this.globalProducts;
    }
    addProduct(product) {
        const newProduct = { ...product, id: Date.now() };
        this.globalProducts.push(newProduct);
        return newProduct;
    }
    updateProduct(id, product) {
        this.globalProducts = this.globalProducts.map(p => p.id === Number(id) ? product : p);
        return product;
    }
    deleteProduct(id) {
        this.globalProducts = this.globalProducts.filter(p => p.id !== Number(id));
        return { success: true };
    }
    getOrders() {
        return this.globalOrders.sort((a, b) => b.id - a.id);
    }
    addOrder(order) {
        const newOrder = { ...order, id: Math.floor(1000 + Math.random() * 9000), date: new Date().toLocaleDateString('ru-RU') };
        this.globalOrders.unshift(newOrder);
        return newOrder;
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('auth/request-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "requestOtp", null);
__decorate([
    (0, common_1.Post)('auth/verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Get)('products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Post)('products'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Put)('products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)('orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Post)('orders'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "addOrder", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map