import { useEffect, useState } from "react";
import { UseLoader } from "./interfaces";

/**
 *
 * @param loaderObj
 * @returns {
 *  loaderObjArr Arrayed filled with object for UI
 * }
 */
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
    }, 500);
    return () => clearInterval(timer);
  }, [loaderCount]);

  const loaderObjArr = new Array(loaderCount).fill(loaderObj);

  return { loaderObjArr };
};

export default useLoader;
