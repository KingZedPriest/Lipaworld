import { Link } from "react-router-dom";
import { motion } from "framer-motion";

//Components
import { Button } from "@/components/ui/button";

//Images
import logo from "/logo.png";
import logo1 from "/logo1.png";

//Icons
import { ArrowRight } from "lucide-react";
import { Copyright } from "iconsax-react";

export default function HomePage() {
    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-dvh">
            <div className="mx-auto px-4 py-8 container">
                <main className="flex flex-col justify-center items-center py-20 md:py-32 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="mb-8">
                            <img src={logo1} className="mx-auto h-16 md:h-20 xl:h-24" alt="Lipaworld Logo" />
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="mb-6 font-bold text-brand-blue text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                            Share the Gift of Choice
                        </motion.h1>

                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="mx-auto mb-10 max-w-2xl text-slate-600 text-base md:text-lg xl:text-xl">
                            Send digital vouchers instantly to friends, family, or colleagues. Perfect for any occasion, redeemable
                            anywhere.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
                            <Link to="/gift">
                                <Button size="lg" className="bg-gradient-to-r from-brand-green hover:from-brand-green/90 to-emerald-500 hover:to-emerald-500/90 shadow-lg px-8 py-4 font-semibold text-white text-sm md:text-base xl:text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 transform">
                                    Gift a Voucher
                                    <ArrowRight className="ml-2 size-5" />
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.8 }} className="gap-8 grid grid-cols-1 md:grid-cols-3 mx-auto mt-24 max-w-5xl">
                        {features.map((feature, index) => (
                            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 + index * 0.2, duration: 0.5 }} className="bg-white shadow-md hover:shadow-lg p-6 rounded-xl transition-shadow">
                                <div className="flex justify-center items-center bg-brand-green/10 mb-4 p-3 rounded-full w-12 h-12">
                                    <feature.icon className="size-6 text-brand-green" />
                                </div>
                                <h3 className="mb-2 font-semibold text-brand-blue text-xl">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </main>
            </div>

            <footer className="bg-brand-blue mt-20 py-4 text-white">
                <div className="mx-auto px-4 container">
                    <div className="flex justify-between items-center">
                        <div>
                            <img src={logo} alt="Lipaworld logo" className="w-8" />
                        </div>
                        <div className="text-[10px] text-slate-300 md:text-xs xl:text-sm">
                            <Copyright className="inline mb-0.5" size={20} /> {new Date().getFullYear()} Lipaworld Company. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

const features = [
    {
        title: "Instant Delivery",
        description: "Send vouchers instantly via email or directly to a wallet address.",
        icon: ({ className }: { className?: string }) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
            </svg>
        ),
    },
    {
        title: "Fully Customizable",
        description: "Choose any amount and add a personal message to make it special.",
        icon: ({ className }: { className?: string }) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                <path d="M7 7h.01" />
            </svg>
        ),
    },
    {
        title: "Secure & Reliable",
        description: "Bank-level security ensures your transactions are always protected.",
        icon: ({ className }: { className?: string }) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
    },
]
