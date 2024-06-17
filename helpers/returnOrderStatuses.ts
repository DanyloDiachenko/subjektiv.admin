import { ArtworkOrderStatus } from "@/submodules/common-dto/api-client/main";

export const returnOrderStatus = (status: ArtworkOrderStatus) => {
    switch (status) {
        case ArtworkOrderStatus.PENDING: {
            return "New";
        }
        case ArtworkOrderStatus.PAID: {
            return "Order placed";
        }
        case ArtworkOrderStatus.DELIVERING: {
            return "Delivering";
        }

        case ArtworkOrderStatus.CANCELED: {
            return "Canceled";
        }
        case ArtworkOrderStatus.COMPLETED: {
            return "Completed";
        }
        case ArtworkOrderStatus.PAYOUTS_PROCEED: {
            return "Completed";
        }
    }
};
