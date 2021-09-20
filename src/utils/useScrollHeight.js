import { useState, useEffect } from "react";

export default function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState(undefined);
    
    useEffect(() => {
      function handleScroll() {
        setScrollPosition(window.scrollY);
      }
      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => window.addEventListener('scroll', handleScroll);
    }, []);
    return scrollPosition;
  }