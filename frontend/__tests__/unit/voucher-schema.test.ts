import { voucherSchema } from "@/schemas/voucher-gift.schema"

describe("voucherSchema", () => {
    it("passes with valid email and amount", () => {
        const result = voucherSchema.safeParse({
            recipient: "test@example.com",
            amount: "25",
            customAmount: "",
            message: "Happy birthday!",
        })
        expect(result.success).toBe(true)
    })

    it("passes with valid wallet address", () => {
        const result = voucherSchema.safeParse({
            recipient: "0x1234567890123456789012345678901234567890",
            amount: "100",
            customAmount: "",
            message: "For you",
        })
        expect(result.success).toBe(true)
    })

    it("fails with missing recipient", () => {
        const result = voucherSchema.safeParse({
            recipient: "",
            amount: "25",
            customAmount: "",
        })
        expect(result.success).toBe(false)
        expect(result.error?.format().recipient?._errors[0]).toMatch(/required/i)
    })

    it("fails with invalid recipient format", () => {
        const result = voucherSchema.safeParse({
            recipient: "invalid-email",
            amount: "25",
            customAmount: "",
        })
        expect(result.success).toBe(false)
        expect(result.error?.format().recipient?._errors[0]).toMatch(/must be a valid email address/i)
    })

    it("requires customAmount if custom is selected", () => {
        const result = voucherSchema.safeParse({
            recipient: "test@example.com",
            amount: "custom",
            customAmount: "",
        })
        expect(result.success).toBe(false)
        expect(result.error?.format().customAmount?._errors[0]).toMatch(/required/i)
    })

    it("fails if customAmount is negative", () => {
        const result = voucherSchema.safeParse({
            recipient: "test@example.com",
            amount: "custom",
            customAmount: "-50",
        })
        expect(result.success).toBe(false)
        expect(result.error?.format().customAmount?._errors[0]).toMatch(/positive number/i)
    })

    it("fails if customAmount exceeds limit", () => {
        const result = voucherSchema.safeParse({
            recipient: "test@example.com",
            amount: "custom",
            customAmount: "15000",
        })
        expect(result.success).toBe(false)
        expect(result.error?.format().customAmount?._errors[0]).toMatch(/cannot exceed/i)
    })

    it("fails if message exceeds 500 characters", () => {
        const result = voucherSchema.safeParse({
            recipient: "test@example.com",
            amount: "25",
            customAmount: "",
            message: "a".repeat(501),
        })
        expect(result.success).toBe(false)
        expect(result.error?.format().message?._errors[0]).toMatch(/exceed 500/i)
    })
})
