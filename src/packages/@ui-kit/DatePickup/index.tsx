import clsx from "clsx";
import { ConfigProvider, DatePicker, theme } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
dayjs.extend(utc);

interface DatePickupProps {
  timeEnd: any;
  handleDateChange: any;
}

const DatePickup: React.FC<DatePickupProps> = (props) => {
  const { timeEnd, handleDateChange } = props;

  const defaultCSS =
    "h-9 flex rounded-md border border-line bg-background font-medium text-text hover:border-primary focus:border-primary gap-2 item-center";

  const classes = clsx(defaultCSS);

  return (
    <div className={classes}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#FFE720",
            colorPrimaryActive: "#FFE720",
            colorBgContainer: "#09090b",
            colorBgLayout: "#09090b",

            fontFamily: "Pixel Operator Mono",
            fontWeightStrong: 700,
          },
        }}
      >
        <DatePicker
          className="h-full w-full border-none text-white shadow-none focus-within:border-none focus:border-transparent"
          value={timeEnd} // Convert the state value to Day.js object before passing it to DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          onChange={handleDateChange}
        />
      </ConfigProvider>
    </div>
  );
};

export default DatePickup;
