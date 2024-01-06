import { useEffect } from "react";

const useHandleResize = (maxWidth: number, setZoom: React.Dispatch<React.SetStateAction<number>>) => {
  const handleResize = () => {
    const width = window.innerWidth;
    const newZoom = width < maxWidth ? width / maxWidth : 1;
    setZoom(newZoom);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [maxWidth, setZoom]);
};

export default useHandleResize;
