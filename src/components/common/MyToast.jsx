import React, { useState } from "react";
import { Toast, Col, Button, Row } from "react-bootstrap";
function MyToast(props) {
  const { message, title } = props;
  const [show, setShow] = useState(true);
  return (
    <div>
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="toast"
        data-bs-autohide="false"
      >
        <div className="toast-header">
          <img src="..." className="rounded me-2" alt="..." />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>

        <div className="toast-body">Hello, world! This is a toast message.</div>
      </div>
    </div>
  );
}

export default MyToast;
