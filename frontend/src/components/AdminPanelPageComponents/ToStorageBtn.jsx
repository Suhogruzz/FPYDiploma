import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import state from '../../../GlobalState/state';

function ToStorageBtn({ userId }) {
  const { setCurrentStorageUser } = useContext(state);

  const onClickHandler = () => {
    setCurrentStorageUser(userId);
  };

  return (
    <Link
      to={{
        pathname: '/my-storage',
      }}
      onClick={onClickHandler}
      className="to-storage-btn"
    >
      to storage

    </Link>
  );
}

ToStorageBtn.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default ToStorageBtn;
