import { FastifyReply, FastifyRequest } from "fastify";

//Services
import { getVouchersByRecipient } from "../services/dynamodb.service";

//Schemas
import { GetRecipientVoucherInput } from "../schemas/giftVoucher.schema";

//Utilities
import { sendResponse } from "../utils/response.utils";


export const getRecipientVoucherHandler = async (request: FastifyRequest<{ Querystring: GetRecipientVoucherInput }>, reply: FastifyReply) => {

    //Fetch Recipient
    const recipient = request.query.recipient;

    //Throw an error if recipient is not available
    if (!recipient) return sendResponse(reply, 400, false, "No Recipient found.");

    //Fetch recipient vouchers and return
    const data = await getVouchersByRecipient(recipient);
    return sendResponse(reply, 200, true, "Vouchers was fetched successfully", data);
}
