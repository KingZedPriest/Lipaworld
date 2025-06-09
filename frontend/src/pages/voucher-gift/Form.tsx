import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-fox-toast";

//Schemas
import { voucherSchema, type VoucherFormData } from "@/schemas/voucher-gift.schema";

//Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Error from "@/components/error";

//Icons
import { Gift, MessageSquare } from "lucide-react";
import { DollarSquare, Send2, Sms, Wallet1 } from "iconsax-react";


const amountOptions = [
    { value: "25", label: "$25" },
    { value: "50", label: "$50" },
    { value: "100", label: "$100" },
    { value: "250", label: "$250" },
    { value: "custom", label: "Custom Amount" },
]

export default function VoucherGiftForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showCustomAmount, setShowCustomAmount] = useState(false)

    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<VoucherFormData>({
        resolver: zodResolver(voucherSchema),
        defaultValues: {
            recipient: "",
            amount: "",
            customAmount: "",
            message: "",
        },
    })

    const selectedAmount = watch("amount")

    const onSubmit = async (data: VoucherFormData) => {
        setIsSubmitting(true)

        try {
            // await giftVoucher(data)
            reset()
            setShowCustomAmount(false)
            toast.success("Voucher sent successfully! 🎉")
        } catch (error) {
            console.error("Failed to gift voucher:", error)
            toast.error("Failed to send voucher. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleAmountChange = (value: string) => {
        setValue("amount", value)
        setShowCustomAmount(value === "custom")
        if (value !== "custom") {
            setValue("customAmount", "")
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-xl">
            <Card className="bg-white/95 shadow-2xl backdrop-blur-sm border-0">
                <CardHeader className="pb-6 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="flex justify-center items-center bg-gradient-to-br from-brand-green to-emerald-400 mx-auto mb-4 rounded-full w-16 h-16">
                        <Gift className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="font-bold text-brand-blue text-2xl">Gift a Voucher</CardTitle>
                    <CardDescription className="text-slate-600">Send a digital voucher to someone special</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-2">
                            <Label htmlFor="recipient" className="flex items-center gap-2 font-medium text-brand-blue">
                                <div className="flex items-center gap-1">
                                    <Sms className="size-4" />
                                    <Wallet1 className="size-4" />
                                </div>
                                Email or Wallet Address
                            </Label>
                            <Input id="recipient" {...register("recipient")} placeholder="recipient@example.com or 0x..."
                                className={`transition-all duration-200 ${errors.recipient
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                    : "border-slate-300 focus:border-brand-green focus:ring-brand-green/20"
                                    }`} />
                            <AnimatePresence>
                                {errors.recipient && errors.recipient.message && (
                                    <Error message={errors.recipient.message} />
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-2">
                            <Label htmlFor="amount" className="flex items-center gap-2 font-medium text-brand-blue">
                                <DollarSquare className="size-4" />
                                Amount
                            </Label>
                            <Select onValueChange={handleAmountChange} value={selectedAmount}>
                                <SelectTrigger className={`transition-all duration-200 ${errors.amount
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                    : "border-slate-300 focus:border-brand-green focus:ring-brand-green/20"
                                    }`}>
                                    <SelectValue placeholder="Select amount" />
                                </SelectTrigger>
                                <SelectContent>
                                    {amountOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <AnimatePresence>
                                {errors.amount && errors.amount.message && (
                                    <Error message={errors.amount.message} />
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <AnimatePresence>
                            {showCustomAmount && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="space-y-2">
                                    <Label htmlFor="customAmount" className="font-medium text-brand-blue">
                                        Custom Amount ($)
                                    </Label>
                                    <Input id="customAmount" type="number" min="1" step="0.01" {...register("customAmount")} placeholder="Enter custom amount" className={`transition-all duration-200 ${errors.customAmount
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                        : "border-slate-300 focus:border-brand-green focus:ring-brand-green/20"
                                        }`} />
                                    <AnimatePresence>
                                        {errors.customAmount && errors.customAmount.message && (
                                            <Error message={errors.customAmount.message} />
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="space-y-2">
                            <Label htmlFor="message" className="flex items-center gap-2 font-medium text-brand-blue">
                                <MessageSquare className="w-4 h-4" />
                                Message (Optional)
                            </Label>
                            <Textarea id="message" {...register("message")} placeholder="Add a personal message..." rows={3} className="border-slate-300 focus:border-brand-green focus:ring-brand-green/20 transition-all duration-200 resize-none" />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                            <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-brand-green hover:from-brand-green/90 to-emerald-500 hover:to-emerald-500/90 py-3 w-full font-semibold text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 transform">
                                <AnimatePresence mode="wait">
                                    {isSubmitting ? (
                                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                            <div className="border-2 border-white/30 border-t-white rounded-full size-4 animate-spin" />
                                            Sending...
                                        </motion.div>
                                    ) : (
                                        <motion.div key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                            <Send2 className="size-4" />
                                            Send Voucher
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </motion.div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    )
}