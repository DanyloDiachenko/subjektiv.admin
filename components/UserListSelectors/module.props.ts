import { ISelectVariant } from "../UI/Select/variant.interface";

export interface UserListSelectorsProps {
    role: ISelectVariant | null;
    setRole: (value: ISelectVariant) => void;
    roleVariants: ISelectVariant[];

    accountStatus: ISelectVariant | null;
    setAccountStatus: (value: ISelectVariant) => void;
    accountStatusVariants: ISelectVariant[];

    location: ISelectVariant | null;
    setLocation: (value: ISelectVariant) => void;
    locationVariants: ISelectVariant[];

    verificationStatus: ISelectVariant | null;
    setVerificationStatus: (value: ISelectVariant) => void;
    verificationStatusVariants: ISelectVariant[];

    isUserExpert: ISelectVariant | null;
    setIsUserExpert: (value: ISelectVariant) => void;
    isUserExpertVariants: ISelectVariant[];

    pageType: "users" | "expertWantedUsers";
}
