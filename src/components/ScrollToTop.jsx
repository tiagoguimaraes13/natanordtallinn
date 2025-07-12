import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ScrollToTop.css";
import NataIcon from "./NataIcon";  // Verify the path

const ScrollToTop = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button className="scroll-to-top" onClick={scrollToTop} aria-label={t("scrollToTop")}>
        <NataIcon width={24} height={24} fillCrust="#f4c542" fillCustard="#fcd34d" stroke="#b89d29" />
        <span className="scroll-text">{t("scrollToTop")}</span>
      </button>
    )
  );
};

export default ScrollToTop;
