import { useEffect, useState } from "react";
import bg_vec from "@/app/public/assets/bg/pc/Vector.svg";
import bg_vecC from "@/app/public/assets/bg/pc/VectorC.svg";
import bg_vecM from "@/app/public/assets/bg/cel/Vector.svg";
import bg_vecCM from "@/app/public/assets/bg/cel/VectorC.svg";

export const useResponsiveBackground = () => {
  const [bgImage, setBgImage] = useState({
    primary: bg_vec,
    secondary: bg_vecC,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setBgImage({ primary: bg_vecM, secondary: bg_vecCM });
      } else {
        setBgImage({ primary: bg_vec, secondary: bg_vecC });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return bgImage;
};
