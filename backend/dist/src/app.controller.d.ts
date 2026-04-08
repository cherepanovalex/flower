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
    private globalProducts;
    private globalOrders;
    getProducts(): any[];
    addProduct(product: any): any;
    updateProduct(id: string, product: any): any;
    deleteProduct(id: string): {
        success: boolean;
    };
    getOrders(): any[];
    addOrder(order: any): any;
}
