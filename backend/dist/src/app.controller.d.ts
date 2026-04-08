import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): {
        status: string;
        message: string;
    };
    requestOtp(body: {
        email: string;
    }): Promise<{
        message: string;
        code: string;
    }>;
    verifyOtp(body: {
        email: string;
        code: string;
    }): Promise<{
        token: string;
        user: {
            email: string;
            role: string;
        };
    }>;
    getProducts(): Promise<{
        id: number;
        name: string;
        price: number;
    }[]>;
    getProduct(id: string): Promise<{
        id: string;
        name: string;
        price: number;
        description: string;
    }>;
    createOrder(orderData: any, req: any): Promise<{
        message: string;
        orderId: number;
    }>;
    getMyOrders(req: any): Promise<never[]>;
    createProduct(productData: any): Promise<{
        message: string;
    }>;
    updateProduct(id: string, productData: any): Promise<{
        message: string;
    }>;
    deleteProduct(id: string): Promise<{
        message: string;
    }>;
    getAllOrders(): Promise<never[]>;
}
