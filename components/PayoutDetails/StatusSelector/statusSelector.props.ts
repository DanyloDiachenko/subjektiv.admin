import {
    PaymentOperatorEnum,
    PayoutStateEnum,
} from "@/submodules/common-dto/api-client/main";

export interface StatusSelectorProps {
    payoutStatus: PayoutStateEnum;
    targetOperator: PaymentOperatorEnum;
}
