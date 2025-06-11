import { FastifyInstance } from "fastify";

//Handlers
import { getRecipientVoucherHandler, giftVoucherHandler } from "../controllers/voucher.controller";

//Schemas
import { GetRecipientVoucherInput, voucherRef } from "../schemas/giftVoucher.schema";
import { generalRef } from "../schemas/general.schema";



export default async function voucherRoutes(app: FastifyInstance) {

    //Gift Voucher
    app.post<{ Body: VoucherApiData }>("/sendVoucher", {
        schema: {
            tags: ['Vouchers'],
            body: voucherRef('giftVoucherSchema'),
            response: {
                200: generalRef('responseSchema'),
                400: generalRef('badRequestSchema')
            }
        }
    }, giftVoucherHandler);

    //Get a recipient vouchers
    app.get<{ Querystring: GetRecipientVoucherInput }>("/getVouchers", {
        schema: {
            tags: ['Vouchers'],
            querystring: voucherRef('getRecipientVoucherSchema'),
            response: {
                200: voucherRef('giftVoucherResponseSchema'),
                400: generalRef('badRequestSchema')
            }
        }
    }, getRecipientVoucherHandler)

}