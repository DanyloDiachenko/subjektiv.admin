import { ArtworkOrderStatus } from '../api-client/main';

const OrderStatusTransitionMap = {
    [ArtworkOrderStatus.PENDING]: [ArtworkOrderStatus.PAID, ArtworkOrderStatus.CANCELED],
    [ArtworkOrderStatus.PAID]: [
        ArtworkOrderStatus.DELIVERING,
        ArtworkOrderStatus.PAYOUTS_PROCEED,
        ArtworkOrderStatus.CANCELED,
    ],
    [ArtworkOrderStatus.DELIVERING]: [
        ArtworkOrderStatus.PAID,
        ArtworkOrderStatus.PAYOUTS_PROCEED,
        ArtworkOrderStatus.CANCELED,
    ],
    [ArtworkOrderStatus.PAYOUTS_PROCEED]: [ArtworkOrderStatus.COMPLETED],
    [ArtworkOrderStatus.COMPLETED]: [],
    [ArtworkOrderStatus.CANCELED]: [],
} as const satisfies Record<ArtworkOrderStatus, ReadonlyArray<ArtworkOrderStatus>>;

export default OrderStatusTransitionMap;
