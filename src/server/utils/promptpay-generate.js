import generatePayload from "promptpay-qr";
import QRCode from 'qrcode'

export async function generatePromptPayQR(promptpayId, amount) {
    const payload = generatePayload(promptpayId, {
        amount,
    });

    const qrCodeDataURL = await QRCode.toDataURL(payload, {
        width: 400,
        margin: 4,
        color: {
            dark: '#000000',
            light: '#ffffff'
        },
    })

    return qrCodeDataURL

}