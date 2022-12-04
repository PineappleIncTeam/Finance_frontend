import React from "react";

import {
  DateRange,
  DateRangePicker,
  Calendar,
  DefinedRange,
} from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { useState } from "react";
import { ConfigProvider } from "antd";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

const CalendarDate = () => (
  <ConfigProvider direction="rtl">
    <Space direction="vertical" size={12}>
      <RangePicker />
    </Space>
  </ConfigProvider>
);
export default CalendarDate;

// const CalendarDate = () => {
//   return (
//     <div>
//       <Calendar weekStartsOn={1} />;
//     </div>
//   );
// };
