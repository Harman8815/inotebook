import React from 'react';
import PropTypes from 'prop-types';



const Alert = (props) => {
  return (
    <div style={{ height: '50px' }}>
      {props.alert.msg && (
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{props.alert.type.charAt(0).toUpperCase() + props.alert.type.slice(1)}:</strong> {props.alert.msg}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => props.showAlert('', '')} // Call showAlert to clear the alert
          ></button>
        </div>
      )}
    </div>
  );
};

export default Alert;