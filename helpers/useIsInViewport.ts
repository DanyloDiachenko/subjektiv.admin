import { useRef, useEffect, useState } from "react";

export default function useIsInViewport() {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [isInViewPort, setIsInViewPort] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const isInViewPort = !!entries[0]?.isIntersecting;

            setIsInViewPort(isInViewPort);
        });

        elementRef.current && observer.observe(elementRef.current);

        return () => observer.disconnect();
    }, []);

    return { elementRef, isInViewPort };
}
