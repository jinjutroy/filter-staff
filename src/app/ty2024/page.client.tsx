"use client";
import React, { useEffect, useState } from "react";
import TextAnimation from "./text-animation/TextAnimation";

import styles from "./ty2024.module.scss";
import constantTy2024 from "./constant";
import FadeInText from "./fade-in-text/FadeInText";
import { Input, Modal } from "antd";
import dayjs from "dayjs";

var toObject = require("dayjs/plugin/toObject");
dayjs.extend(toObject);

const PageClient = () => {
  const [pass, setPass] = useState(false);
  const [duration, setDuration] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateDuration = () => {
      const startTime = dayjs(Date.now());
      const endTime = dayjs("2000-06-03T00:00:00");
      const days = startTime.diff(endTime, "days");
      const hours = startTime.diff(endTime, "hours");
      const minutes = startTime.diff(endTime, "minutes");
      const seconds = startTime.diff(endTime, "seconds");

      setDuration({ days, hours, minutes, seconds });
    };

    const interv = setInterval(calculateDuration, 1000);
    return () => {
      clearInterval(interv);
    };
  }, []);
  if (!pass) {
    return (
      <Modal open footer={null}>
        <h2>Nhập đúng mật khẩu để xem nội dung</h2>
        <Input
          className={styles["input-pass"]}
          title="Nhập mật khẩu để xem nội dung"
          placeholder="Nhập mật khẩu để xem nội dung"
          type="password"
          onChange={(e) => {
            if (e.target.value === "060305102000") setPass(true);
          }}
        />
      </Modal>
    );
  }
  return (
    <div>
      <div className={styles["container"]}>
        <div className="">
          <TextAnimation />
        </div>
        <FadeInText text={constantTy2024.textWish} />
        <div
          className={styles["desc-wish"]}
          dangerouslySetInnerHTML={{ __html: constantTy2024.descWish }}
        ></div>
        <div className={styles["time"]}>
          <div>D-{duration.days}</div>
          <div>H-{duration.hours}</div>
          <div>M-{duration.minutes}</div>
          <div>S-{duration.seconds}</div>
        </div>
      </div>
    </div>
  );
};

export default PageClient;
