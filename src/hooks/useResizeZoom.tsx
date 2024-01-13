import { useState, useEffect } from "react";

const useResizeZoom = (maxWidth: number) => {
  const [zoom, setZoom] = useState(1);

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
  }, []);

  return { zoom };
};

export default useResizeZoom;
