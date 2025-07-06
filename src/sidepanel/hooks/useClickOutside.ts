import { useEffect } from "react";

type TOptions = {
  whitelistRefs?: React.RefObject<HTMLElement>[];
};

const useClickOutside = (
  targetRef: React.RefObject<HTMLElement | null>,
  callback: () => void,
  options?: TOptions
) => {
  const { whitelistRefs = [] } = options || {};

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedTarget = event.target as Node;

      const isInsideTarget = targetRef.current?.contains(clickedTarget);
      const isInsideWhitelist = whitelistRefs.some(
        (ref) => ref.current && ref.current.contains(clickedTarget)
      );

      if (!isInsideTarget && !isInsideWhitelist) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [targetRef, callback, whitelistRefs]);

  return null;
};

export default useClickOutside;
