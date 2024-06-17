import { Tooltip as ReactTooltip } from "react-tooltip";

import { TooltipProps } from "./tooltip.props";

export const Tooltip = ({ id }: TooltipProps): JSX.Element => {
    return <ReactTooltip id={id} place="bottom" />;
};
