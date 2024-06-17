import { useEffect, RefObject } from "react";

type Event = MouseEvent | TouchEvent;

const onClickOutside = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    callback: (event: Event) => void,
) => {
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback(event);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
};

export default onClickOutside;
