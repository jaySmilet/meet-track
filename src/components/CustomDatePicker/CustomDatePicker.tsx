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
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
      stroke="#000000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const CustomButton = forwardRef<
  HTMLButtonElement,
  React.HTMLProps<HTMLButtonElement>
>(({ value, onClick }, ref) => (
  <button
    type="button"
    className="date-input w-100"
    onClick={onClick}
    ref={ref}
  >
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
