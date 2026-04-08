import { Controller, Get, Post, Put, Delete, Body, Param, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // ====================== AUTH ======================
  @Post('auth/request-otp')
  async requestOtp(@Body() body: { email: string }) {
    // 1. Generate 6 digit code (e.g., Math.random)
    // 2. Save to OtpCode table with TTL (e.g. 10 mins)
    // 3. Send email via NodeMailer/SendGrid
    return { message: 'OTP sent to ' + body.email };
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
