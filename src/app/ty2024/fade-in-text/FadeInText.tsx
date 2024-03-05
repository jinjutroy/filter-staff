import React from "react";
import styles from "./FadeInText.module.scss";

interface FadeInTextProps {
  text?: string;
}

const FadeInText: React.FC<FadeInTextProps> = ({ text }) => {
  const arrString = text?.split(" ");
  return (
    <div className={styles["root"]}>
      <h1 className={styles["h1"]}>
        {arrString?.map((item, index) => {
          return (
            <span key={index} className={styles["span"]}>
              {item}
            </span>
          );
        })}
      </h1>
    </div>
  );
};

export default FadeInText;
