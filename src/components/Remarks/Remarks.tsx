import React, { Component, type RefObject } from "react";
import "./Remarks.css";
import { Link } from "react-router-dom";

interface State {
  remarks: string;
}

class Remarks extends Component<{}, State> {
  textareaRef: RefObject<HTMLTextAreaElement | null>;

  constructor(props: {}) {
    super(props);
    this.state = {
      remarks: "",
    };
    this.textareaRef = React.createRef();
  }

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ remarks: e.target.value });
  };

  adjustTextareaHeight = () => {
    if (this.textareaRef.current) {
      this.textareaRef.current.style.height = "auto";
      this.textareaRef.current.style.height =
        this.textareaRef.current.scrollHeight + "px";
    }
  };

  componentDidMount() {
    this.adjustTextareaHeight();
  }

  componentDidUpdate(_prevProps: {}, prevState: State) {
    if (prevState.remarks !== this.state.remarks) {
      this.adjustTextareaHeight();
    }
  }

  render() {
    const { remarks } = this.state;

    return (
      <div className="d-flex justify-content-center flex-column gap-2 p-5">
        <div className="d-flex align-items-center justify-content-between">
          <p className="fw-semibold mb-0">Remarks</p>
          <p className="counter mb-0">({remarks.length}/500)</p>
        </div>

        <textarea
          ref={this.textareaRef}
          className="p-2 auto-expand"
          name="remarks"
          id="remarks"
          rows={2}
          value={remarks}
          maxLength={500}
          placeholder="Type Here..."
          onChange={this.handleChange}
        ></textarea>

        <div className="d-flex align-items-center justify-content-center mt-5">
          <Link to="/">
            <i className="bi bi-sign-turn-left-fill me-2"></i>Go To Table
            Listing
          </Link>
        </div>
      </div>
    );
  }
}

export default Remarks;
