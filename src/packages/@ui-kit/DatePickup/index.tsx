import clsx from "clsx";
import { ConfigProvider, DatePicker, theme } from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import React from "react";

dayjs.extend(utc);

interface DatePickupProps {
  timeEnd: Dayjs | null;
  handleDateChange: (date: Dayjs | null, dateString: string | string[]) => void;
  showTime?: boolean;
}

const DatePickup: React.FC<DatePickupProps> = ({
  timeEnd,
  handleDateChange,
  showTime = true,
}) => {
  const defaultCSS =
    "h-9 flex rounded-md border border-line bg-background font-medium text-text hover:border-primary focus:border-primary gap-2 items-center";

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
          value={timeEnd}
          format={showTime ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"}
          onChange={handleDateChange}
          showTime={showTime}
        />
      </ConfigProvider>
    </div>
  );
};

export default DatePickup;
