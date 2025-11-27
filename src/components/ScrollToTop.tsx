import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();
    const prevPathname = useRef(pathname);

    useEffect(() => {
        const pathChanged = prevPathname.current !== pathname;
        prevPathname.current = pathname;

        if (hash) {
            // If there's a hash, scroll to that element
            const scrollToHash = () => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);

                if (element) {
                    // Add a delay to ensure the page has rendered
                    setTimeout(() => {
                        const yOffset = -80; // Offset for fixed header
                        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }, 100);
                }
            };

            // Try multiple times to ensure element is found
            scrollToHash();
            const timer1 = setTimeout(scrollToHash, 200);
            const timer2 = setTimeout(scrollToHash, 400);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        } else if (pathChanged) {
            // Only scroll to top if the path actually changed (not just hash)
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
