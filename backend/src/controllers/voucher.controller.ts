import { FastifyReply, FastifyRequest } from "fastify";

//Services
import { getVouchersByRecipient } from "../services/dynamodb.service";

//Schemas
import { GetRecipientVoucherInput, VoucherInput } from "../schemas/giftVoucher.schema";

//Utilities
import { sendResponse } from "../utils/response.utils";

import { publishVoucherGift } from "../sqs/producer";

//Git a Voucher
export const giftVoucherHandler = async (request: FastifyRequest<{ Body: VoucherInput }>, reply: FastifyReply) => {
    const gift = request.body;
    await publishVoucherGift(gift);
    return sendResponse(reply, 200, true, "Voucher queued successfully");
};

//Get a recipient vouchers
export const getRecipientVoucherHandler = async (request: FastifyRequest<{ Querystring: GetRecipientVoucherInput }>, reply: FastifyReply) => {

    //Fetch Recipient
    const recipient = request.query.recipient;

    //Throw an error if recipient is not available
    if (!recipient) return sendResponse(reply, 400, false, "No Recipient found.");

    //Fetch recipient vouchers and return
    const data = await getVouchersByRecipient(recipient);
    return sendResponse(reply, 200, true, "Vouchers was fetched successfully", data);
}
