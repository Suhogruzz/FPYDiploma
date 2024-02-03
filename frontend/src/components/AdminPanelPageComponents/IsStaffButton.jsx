import React from 'react';
import PropTypes from 'prop-types';
import '../../pages/AdminPanelPage/AdminPanel.css';

function IsStaffBtn({ isStaff, onClickHandler, setIsStaff }) {
  const isStaffHandler = () => {
    setIsStaff(!isStaff);
    onClickHandler('PATCH');
  };

  return (
    <div className={`is-staff-btn-container ${isStaff ? 'on' : 'off'}`} role="button" onClick={isStaffHandler} onKeyDown={isStaffHandler} tabIndex={0}>
      <div className="is-staff-btn" />
    </div>
  );
}

IsStaffBtn.propTypes = {
  isStaff: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  setIsStaff: PropTypes.func.isRequired,
};

export default IsStaffBtn;
