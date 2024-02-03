import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Context from '../../../GlobalState/state';
import { logOut } from '../../api/requests';

function Username({ username }) {
  const [logoutButton, setLogoutButton] = useState(false);
  const [sendRequest, setSendRequest] = useState(false);
  const { setSessionId, setUsername } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await logOut();
      console.log(response);
      if (response) {
        setUsername('');
        setSessionId('');

        navigate('/');
      }
    };

    if (sendRequest) {
      fetchData();
      setSendRequest(false);
    }
  }, [sendRequest]);

  const onMouseEnterHandler = () => {
    setLogoutButton(true);
  };

  const onMouseLeaveHandler = () => {
    setLogoutButton(false);
  };

  const onClickHandler = () => {
    setSendRequest(true);
  };

  return (
    logoutButton
      ? (
        <div
          className="header--logout-btn"
          onMouseLeave={onMouseLeaveHandler}
          onClick={onClickHandler}
          onKeyDown={onClickHandler}
          role="button"
          tabIndex={0}
        >
          Выйти
        </div>
      )
      : (
        <div
          className="header--logout-btn"
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        >
          { username }
        </div>
      )
  );
}

Username.propTypes = {
  username: PropTypes.string,
};

Username.defaultProps = {
  username: 'Anon',
};

export default Username;
