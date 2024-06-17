import React from "react";
import Select, { MultiValue, StylesConfig } from "react-select";

import makeAnimated from "react-select/animated";
export interface ISelectOption {
    value?: number | string;
    label?: string;
    id?: number;
}
interface ISelectorMulti {
    options?: ISelectOption[];
    value?: MultiValue<ISelectOption>;
    onChange?: (options: MultiValue<ISelectOption>) => void;
}
const animatedComponents = makeAnimated();
const SelectorMulti = ({ options, value, onChange }: ISelectorMulti) => {
    const CustomStyle: StylesConfig<ISelectOption, true> = {
        control: (baseStyles, _) => ({
            ...baseStyles,
            borderColor: "transparent",

            backgroundColor: "#F1F1F2",
            borderRadius: "8px",
            boxShadow: "none",
            "&:hover": {
                borderColor: "transparent",
            },
            padding: "4px 2px",
            cursor: "pointer",
        }),
        singleValue: (base) => ({
            ...base,
            fontSize: "14px !important",
            fontWeight: "500 !important",
            color: "#ffffff !important",
            lineHeight: "20px !important",
        }),
        input: (base, _) => ({
            ...base,
            '[type="text"]': {
                fontSize: "14px !important",
                fontWeight: "500 !important",
                // color: "#ffffff !important",
                lineHeight: "20px !important",
            },
        }),
        option: (base, _) => ({
            ...base,
            backgroundColor: "#ffffff",
            cursor: "pointer",
            wordBreak: `break-all`,
            "&:hover": {
                backgroundColor: "rgb(243, 242, 242)",
            },
        }),
    };
    return (
        <Select
            styles={CustomStyle}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            value={value}
            onChange={(option) => onChange && onChange(option)}
        />
    );
};

export default SelectorMulti;
