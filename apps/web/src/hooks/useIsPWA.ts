import { useState, useEffect } from "react";


export const useIsPWA = () => {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const checkPWA = () => {
      const isFullscren = window.matchMedia('(display-mode: fullscreen)').matches;
      const isIOSPWA = (window.navigator as any).fullscreen === true;
      setIsPWA(isFullscren || isIOSPWA);
    };

    checkPWA();
  }, []);

  return { isPWA }

}
