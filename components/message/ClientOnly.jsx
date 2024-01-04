import {useEffect, useState} from "react";

/*
    React Hydration Error
    Check if component has rended in client side. 
    https://www.joshwcomeau.com/react/the-perils-of-rehydration/#the-solution

    calling 
    ClientOnly()
*/

export function ClientOnly() {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
      setHasMounted(true);
    }, []);
    
    if (!hasMounted) {
      return false;
    }
    else return true
  }