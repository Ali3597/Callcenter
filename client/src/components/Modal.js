import React from "react";
import "./Modal.css";
import { createPortal } from "react-dom";
import { FaWindowClose } from "react-icons/fa";

export function Modal({ onClose, title }) {
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
          <div className="modal-body">alooooo</div>
        </div>
      </div>
    </>,
    document.body
  );
}
