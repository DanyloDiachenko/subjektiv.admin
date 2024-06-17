"use client";

import React from "react";
import { Provider } from "react-redux";

import { store } from "../index";
import { ReduxProviderProps } from "./module.props";

export const ReduxProvider = ({
    children,
}: ReduxProviderProps): JSX.Element => {
    return <Provider store={store}> {children} </Provider>;
};
