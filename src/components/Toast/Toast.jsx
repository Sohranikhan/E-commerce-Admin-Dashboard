"use client"
import "./Toast.css"
const Toast = ({ message, type, onClose }) => {
    return (
      <div
        className={` w-72 h-fit max-h-24 rounded text-black fixed top-0 right-0 toast ${type==='success'? 'bg-success': 'bg-error'}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-message w-full h-full">{message}</div>
        <button className="toast-close absolute top-1 right-1" onClick={onClose}> X
        </button>
      </div>
    );
  };

  export default Toast