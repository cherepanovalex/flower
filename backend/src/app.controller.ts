import { Controller, Get, Post, Put, Delete, Body, Param, Request } from '@nestjs/common';
import { AppService } from './app.service';
import * as nodemailer from 'nodemailer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      status: 'success',
      message: 'Fleur Shop API is running successfully! 🌺'
    };
  }

  // ====================== AUTH ======================
  @Post('auth/request-otp')
  async requestOtp(@Body() body: { email: string }) {
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
    } catch (error) {
      console.error('Ошибка отправки Email. Убедитесь, что EMAIL_USER и EMAIL_PASS указаны в .env', error);
      return { message: 'OTP sent in DEV mode', code: code }; 
    }

    return { message: 'OTP sent to ' + body.email, code: code };
  }

  @Post('auth/verify-otp')
  async verifyOtp(@Body() body: { email: string; code: string }) {
    return { token: 'jwt-token-example', user: { email: body.email, role: 'USER' } };
  }

  // --- MOCK IN-MEMORY DATABASES ---
  private globalProducts = [
    { id: 1, name: 'Royalty', price: 281300, imageUrl: '/images/roses_bouquet_1775641316261.png', category: 'kustovye-rozy', type: 'Моно-букет', color: 'Алый', composition: ['Кустовая роза'] },
    { id: 2, name: 'Sunset Reverie', price: 800000, imageUrl: '/images/peonies_bouquet_1775641302410.png', category: 'avtorskie', type: '', color: '', composition: [] },
    { id: 3, name: 'Hydrangeas 7', price: 33000, imageUrl: '/images/hero_flowers_1775641286421.png', category: 'gollandskie', type: '', color: 'Сиреневый', composition: [] },
    { id: 4, name: 'Julette 5.0', price: 71800, imageUrl: '/images/hatbox_flowers_1775641332248.png', category: 'kashpo', type: '', color: 'Алый', composition: ['Роза 40 см', 'Эвкалипт'] },
    { id: 5, name: 'Zhanym', price: 68000, imageUrl: '/images/dried_flowers_1775641363329.png', category: 'mono', type: 'Моно-букет', color: 'Сиреневый', composition: ['Джульетта'] },
  ];
  private globalOrders = [];

  // ====================== PRODUCTS ======================
  @Get('products')
  getProducts() {
    return this.globalProducts;
  }

  @Post('products')
  addProduct(@Body() product: any) {
    const newProduct = { ...product, id: Date.now() };
    this.globalProducts.push(newProduct);
    return newProduct;
  }

  @Put('products/:id')
  updateProduct(@Param('id') id: string, @Body() product: any) {
    this.globalProducts = this.globalProducts.map(p => p.id === Number(id) ? product : p);
    return product;
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) {
    this.globalProducts = this.globalProducts.filter(p => p.id !== Number(id));
    return { success: true };
  }

  // ====================== ORDERS ======================
  @Get('orders')
  getOrders() {
    return this.globalOrders.sort((a,b) => b.id - a.id);
  }

  @Post('orders')
  addOrder(@Body() order: any) {
    const newOrder = { ...order, id: Math.floor(1000 + Math.random() * 9000), date: new Date().toLocaleDateString('ru-RU') };
    this.globalOrders.unshift(newOrder); // Add to top
    return newOrder;
  }
}
