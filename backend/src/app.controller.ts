import { Controller, Get, Post, Put, Delete, Body, Param, Request } from '@nestjs/common';
import { AppService } from './app.service';
import * as nodemailer from 'nodemailer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
      // В режиме разработки просто возвращаем код на клиент, если почта не настроена
      return { message: 'OTP sent in DEV mode', code: code }; 
    }

    return { message: 'OTP sent to ' + body.email, code: code };
  }

  @Post('auth/verify-otp')
  async verifyOtp(@Body() body: { email: string; code: string }) {
    // 1. Validate code in DB and check expiration
    // 2. Find User by email or create new User
    // 3. Generate JWT
    return { token: 'jwt-token-example', user: { email: body.email, role: 'USER' } };
  }

  // ====================== PRODUCTS ======================
  @Get('products')
  async getProducts() {
    // prisma.product.findMany()
    return [
      { id: 1, name: 'Нежный пион', price: 3500 },
      { id: 2, name: 'Монобукет из роз', price: 4200 }
    ];
  }

  @Get('products/:id')
  async getProduct(@Param('id') id: string) {
    // prisma.product.findUnique()
    return { id, name: 'Нежный пион', price: 3500, description: '...' };
  }

  // ====================== ORDERS ======================
  // Requires JwtAuthGuard in real implementation
  @Post('orders')
  async createOrder(@Body() orderData: any, @Request() req) {
    // 1. Validate orderItems
    // 2. Calculate totalPrice on server side using DB prices (security)
    // 3. Save Order and OrderItems to DB (prisma.order.create)
    return { message: 'Order created successfully', orderId: 1 };
  }

  @Get('orders/my')
  async getMyOrders(@Request() req) {
    // req.user has extracted payload from JWT
    // fetch user orders: prisma.order.findMany({ where: { userId: req.user.id } })
    return [];
  }

  // ====================== ADMIN ======================
  // Requires JwtAuthGuard AND RolesGuard('ADMIN')
  @Post('admin/product')
  async createProduct(@Body() productData: any) {
    return { message: 'Product created' };
  }

  @Put('admin/product/:id')
  async updateProduct(@Param('id') id: string, @Body() productData: any) {
    return { message: 'Product updated' };
  }

  @Delete('admin/product/:id')
  async deleteProduct(@Param('id') id: string) {
    return { message: 'Product deleted' };
  }

  @Get('admin/orders')
  async getAllOrders() {
    // return prisma.order.findMany({ include: { orderItems: true } })
    return []; 
  }
}
