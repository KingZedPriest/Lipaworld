import { motion } from "framer-motion";

const Error = ({ message }: { message: string }) => {
    return (
        <motion.p role="alert" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-500">
            {message}
        </motion.p>
    );
}

export default Error;