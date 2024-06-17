import { useEffect } from "react";

type ClickOutsideCallback = (event: MouseEvent) => void;

const useClickOutside = (
    ref: React.RefObject<HTMLElement>,
    onClickOutside: ClickOutsideCallback,
): void => {
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            onClickOutside(event);
        }
    };

    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
            handleClickOutside(event);
        };

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, [ref, onClickOutside]);
};

export default useClickOutside;
