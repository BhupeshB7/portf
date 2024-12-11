import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const useSmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({ 
            duration: 1.2, 
            easing: (t) => t * (2 - t) 
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);
};

export default useSmoothScroll;
