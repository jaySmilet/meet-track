// CustomDatePicker.tsx
import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css";

type CustomDatePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
};

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <rect
      x="3"
      y="4"
      width="18"
      height="17"
      rx="3"
      ry="3"
      fill="none"
      stroke="#111827"
    />
    <line x1="3" y1="9" x2="21" y2="9" stroke="#111827" />
    <line x1="8" y1="2" x2="8" y2="6" stroke="#111827" />
    <line x1="16" y1="2" x2="16" y2="6" stroke="#111827" />
  </svg>
);

const CustomButton = forwardRef<
  HTMLButtonElement,
  React.HTMLProps<HTMLButtonElement>
>(({ value, onClick }, ref) => (
  <button type="button" className="date-input" onClick={onClick} ref={ref}>
    <span className="date-text">
      {value ? format(new Date(value as string), "dd-MMM-yyyy") : "Select date"}
    </span>
    <CalendarIcon />
  </button>
));
CustomButton.displayName = "CustomButton";

const CustomDatePicker = ({ value, onChange }: CustomDatePickerProps) => {
  return (
    <DatePicker
      selected={value}
      onChange={(date) => onChange(date as Date | null)}
      dateFormat="dd-MMM-yyyy"
      customInput={<CustomButton />}
    />
  );
};

export default CustomDatePicker;
