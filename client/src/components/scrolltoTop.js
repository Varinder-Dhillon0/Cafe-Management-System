import React, { useState, useEffect } from "react";
import Styles from "../styles/scrolltoTop.module.css";
import { RiArrowUpSLine } from "react-icons/ri";

const GoTop = () => {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div
            className={`${Styles.goTop} ${showButton ? "" : Styles.inactive}`}
            onClick={() => scrollToTop()}
        >
            <RiArrowUpSLine
                fill="white"
                style={{
                    background: "var(--headings-bg)",
                    borderRadius: "50%",
                    padding: "5px",
                }}
                fontSize={40}
            />
        </div>
    );
};

export default GoTop;
