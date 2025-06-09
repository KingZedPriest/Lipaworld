import { z } from "zod";

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Ethereum wallet address validation regex (basic)
const walletRegex = /^0x[a-fA-F0-9]{40}$/

export const voucherSchema = z
    .object({
        recipient: z
            .string()
            .min(1, "Recipient is required")
            .refine(
                (value) => emailRegex.test(value) || walletRegex.test(value),
                "Must be a valid email address or wallet address (0x...)"
            ),
        amount: z.string().min(1, "Amount is required"),
        customAmount: z.string().optional(),
        message: z.string().max(500, "Message cannot exceed 500 characters").optional(),
    })
    .superRefine((data, ctx) => {
        if (data.amount === "custom") {
            if (!data.customAmount || data.customAmount.trim() === "") {
                ctx.addIssue({
                    path: ["customAmount"],
                    code: z.ZodIssueCode.custom,
                    message: "Custom amount is required when custom is selected",
                });
                return;
            }

            const numValue = Number.parseFloat(data.customAmount);
            if (isNaN(numValue) || numValue <= 0) {
                ctx.addIssue({
                    path: ["customAmount"],
                    code: z.ZodIssueCode.custom,
                    message: "Custom amount must be a positive number",
                });
            }

            //Added a 1,000 Constraint
            if (numValue > 10000) {
                ctx.addIssue({
                    path: ["customAmount"],
                    code: z.ZodIssueCode.custom,
                    message: "Custom amount cannot exceed $10,000",
                });
            }
        }
    });


export type VoucherFormData = z.infer<typeof voucherSchema>;