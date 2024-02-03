import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IsStaffBtn from './IsStaffButton';
import ToStorageBtn from './ToStorageBtn';
import { deleteUser, patchUser } from '../../api/requests';
import img from '../../../public/svg/trash-fill.svg';
import '../../pages/AdminPanelPage/AdminPanel.css';

function User({
  id, username, firstName, lastName, email, numOfFiles, size, isStaff, removeItem,
}) {
  const [sendRequest, setSendRequest] = useState('');
  const [_isStaff, _setIsStaff] = useState(isStaff);

  useEffect(() => {
    const fetchDataDelete = async () => {
      const response = await deleteUser(id);

      if (response.status === 200) {
        removeItem(id);
      }
    };

    const fetchDataPatch = async () => {
      await patchUser(id, _isStaff);
    };

    if (sendRequest === 'DELETE') {
      fetchDataDelete();
      setSendRequest('');
    }

    if (sendRequest === 'PATCH') {
      fetchDataPatch();
      setSendRequest('');
    }
  }, [sendRequest]);

  const onClickHandler = (method) => {
    setSendRequest(method);
  };

  return (
    <tr key={id}>
      <td>{ username }</td>
      <td>{ firstName }</td>
      <td>{ lastName }</td>
      <td>{ email }</td>
      <td>{ numOfFiles }</td>
      <td>{ size }</td>
      <td>
        <IsStaffBtn isStaff={_isStaff} setIsStaff={_setIsStaff} onClickHandler={onClickHandler} />
      </td>
      <td>
        <ToStorageBtn userId={id} />
      </td>
      <td>
        <button onClick={() => onClickHandler('DELETE')} onKeyDown={() => onClickHandler('DELETE')} type="button" aria-label="Delete">
          <img src={img} alt="delete" />
        </button>
      </td>
    </tr>
  );
}

User.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  numOfFiles: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  isStaff: PropTypes.bool.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default User;
