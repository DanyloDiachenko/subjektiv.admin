import { PayoutStateEnum } from '../types/payments/payoutState.enum';

const PayoutStatusTransitionMap = {
    [PayoutStateEnum.CREATED]: [
        PayoutStateEnum.CANCELLED,
        PayoutStateEnum.REJECTED,
        PayoutStateEnum.ACCEPTED,
    ],
    [PayoutStateEnum.REJECTED]: [PayoutStateEnum.ACCEPTED, PayoutStateEnum.CANCELLED],
    [PayoutStateEnum.ACCEPTED]: [PayoutStateEnum.RELEASE_FAILED, PayoutStateEnum.RELEASED],
    [PayoutStateEnum.RELEASE_FAILED]: [PayoutStateEnum.RELEASED],
    [PayoutStateEnum.RELEASED]: [],
    [PayoutStateEnum.CANCELLED]: [],
} as const satisfies Record<PayoutStateEnum, ReadonlyArray<PayoutStateEnum>>;

export default PayoutStatusTransitionMap;
