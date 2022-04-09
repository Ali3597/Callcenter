import React from "react";
import "./Modal.css";
import { createPortal } from "react-dom";


export function Modal({ onClose, title ,message, onClick  , buttonMessage}) {
  return createPortal(
    <>
      <div className="modal ">
        <div className="modal-wrapper">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button onClick={onClose}>
              <span aria-hidden="true">x</span>
            </button>
          </div>
          <div className="modal-body">{message}</div>
          <button onClick={onClick}>{buttonMessage}</button>
        </div>
      </div>
    </>,
    document.body
  );
}
