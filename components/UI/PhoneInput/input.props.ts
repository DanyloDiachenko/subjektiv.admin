import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface InputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    errorMessage?: string | null;
    country?: string | null;
    onChangeValue?: (field: string, value: string) => void;
}
