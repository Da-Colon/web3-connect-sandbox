import { useEffect, useState } from "react";

/**
 *
 * @param loaderObj
 * @returns {
 *  loaderObjArr Arrayed filled with object for UI
 * }
 */

 export interface UseLoader {
  loaderObjArr: string[]
}

const useLoader = (loaderObj: string): UseLoader => {
  const [loaderCount, setLoaderCount] = useState(0);
  // @todo look into using `useRef` for timer instead of being confined to useEffect
  // @todo replace need for loaderCount as part of useEffect dependency
  useEffect(() => {
    const timer = setInterval(() => {
      if (loaderCount < 3) {
        setLoaderCount((num) => num + 1);
        return;
      }
      setLoaderCount(0);
    }, 200);
    return () => clearInterval(timer);
  }, [loaderCount]);

  const loaderObjArr = new Array(loaderCount).fill(loaderObj);

  return { loaderObjArr };
};

export default useLoader;
