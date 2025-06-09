import { useMutation } from "@tanstack/react-query";

//Functions
import { giftUserFn } from "./api.service";

//Gift a Users
export function useGiftUser() {

    return useMutation({
        mutationFn: (data: VoucherApiData) => giftUserFn(data),
        onError: (error) => {
            console.error("Gifting failed:", error);
        }
    })
}