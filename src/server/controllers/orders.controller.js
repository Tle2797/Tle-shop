import { db } from "../db.config";
import { generatePromptPayQR } from "../utils/promptpay-generate";
import { handleUploadFile } from "../utils/upload-file";

export const ordersController = {
    CreateOrderAndQrcode: async (body) => {
        try {
            const { total } = body

            const qrcodePay = await generatePromptPayQR(process.env.PROMPTPAY_ID, total);
            return {
                success: true,
                qrcodeUrl: qrcodePay
            }
        } catch (error) {
            console.log("🚀 ~ CreateOrderAndQrcode: ~ error:", error)
            throw new Error(error.message);
        }

    },
};
