import React from "react";
import "./Remarks.css";
import { Link } from "react-router-dom";

const Remarks = () => {
  const [remarks, setRemarks] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRemarks(e.target.value);
  };

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [remarks]);

  return (
    <div className="d-flex justify-content-center flex-column gap-2 p-5">
      <div className="d-flex align-items-center justify-content-between">
        <p className="fw-semibold mb-0">Remarks</p>
        <p className="counter mb-0">({remarks.length}/500)</p>
      </div>
      <textarea
        ref={textareaRef}
        className="p-2 auto-expand"
        name="remarks"
        id="remarks"
        rows={2}
        value={remarks}
        maxLength={500}
        placeholder="Type Here..."
        onChange={handleChange}
      ></textarea>

      <div className="d-flex align-items-center justify-content-center mt-5">
        <Link to={"/"}>
          <i className="bi bi-sign-turn-left-fill me-2"></i>Go To Table Listing
        </Link>
      </div>
    </div>
  );
};

export default Remarks;
