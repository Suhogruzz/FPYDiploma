import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { deleteFile } from '../../../api/requests';
import state from '../../../../GlobalState/state';
import '../../formStyle/Form.css';
import img from '../../../../public/svg/icons8-close.svg';

function DeleteFileSubmitForm({
  currentFile, setForm, setFiles, setCurrentFile,
}) {
  const { currentStorageUser } = useContext(state);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let response;

    if (currentStorageUser) {
      response = await deleteFile(currentFile.id, currentStorageUser);
    } else {
      response = await deleteFile(currentFile.id);
    }

    const data = response.data;

    if (response.status === 200) {
      setFiles(data);
      setCurrentFile();
      setForm();
    }
  };

  const onCloseHandler = () => {
    setForm();
  };

  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <h2
        className="form--title"
      >
        Вы уверены что хотите удалить этот файл?
      </h2>
      <input type="submit" value="Да" required />
      <button
        className="close"
        onClick={onCloseHandler}
        onKeyDown={onCloseHandler}
        type="button"
        aria-label="Close"
      >
        <img
          src={img}
          alt="close"
        />
      </button>
      <div
        className="no"
        onClick={onCloseHandler}
        onKeyDown={onCloseHandler}
        role="button"
        tabIndex={0}
      >
        Нет
      </div>
    </form>
  );
}

DeleteFileSubmitForm.propTypes = {
  currentFile: PropTypes.instanceOf(Object).isRequired,
  setForm: PropTypes.func.isRequired,
  setFiles: PropTypes.func.isRequired,
  setCurrentFile: PropTypes.func.isRequired,
};

export default DeleteFileSubmitForm;
