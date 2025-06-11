import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

//Response Core
import { responseCore } from "./general.schema";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Ethereum wallet address validation regex (basic)
const walletRegex = /^0x[a-fA-F0-9]{40}$/

//Send Voucher Schema
const giftVoucherSchema = z.object({
    recipient: z
        .string()
        .min(1, "Recipient is required")
        .refine(
            (value) => emailRegex.test(value) || walletRegex.test(value),
            "Must be a valid email address or wallet address (0x...)"
        ),
    amount: z.number().min(1, "Amount is required"),
    message: z.string().max(500, "Message cannot exceed 500 characters").optional(),
})

//Get Recipient Voucher Schema
const getRecipientVoucherSchema = z.object({
    recipient: z.string({
        required_error: "Recipient is Required"
    })
})

const giftVoucherSchemaWithMeta = giftVoucherSchema.extend({
    voucherId: z.string({
        required_error: "VoucherId is Required"
    }),
    createdAt: z.string({
        required_error: "CreatedAt is Required"
    }).datetime(),
})

//Get Recipient Voucher Response Schema
const giftVoucherResponseSchema = responseCore({ status: 200, success: true }).extend({
    data: z.array(
        z.object({
            giftVoucherSchemaWithMeta
        })
    )
})


export type GetRecipientVoucherInput = z.infer<typeof getRecipientVoucherSchema>;
export type VoucherInput = z.infer<typeof giftVoucherSchema>;


export const { schemas: voucherSchema, $ref: voucherRef } = buildJsonSchemas({ giftVoucherSchema, getRecipientVoucherSchema, giftVoucherResponseSchema }, { $id: 'VoucherSchema' })