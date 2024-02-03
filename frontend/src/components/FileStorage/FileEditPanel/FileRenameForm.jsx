import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../../formStyle/Form.css';
import img from '../../../../public/svg/icons8-close.svg';
import { patchFile } from '../../../api/requests';
import state from '../../../../GlobalState/state';

function FileRenameForm({ currentFile, setForm, setFiles }) {
  const newFileName = useRef();
  const { currentStorageUser } = useContext(state);

  useEffect(() => {
    newFileName.current.value = currentFile.native_file_name;
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const patchData = currentFile;
    patchData.native_file_name = newFileName.current.value;

    let response;

    if (currentStorageUser) {
      response = await patchFile(patchData, currentStorageUser);
    } else {
      response = await patchFile(patchData);
    }

    const data = await response.data;

    if (response.status === 200) {
      setFiles(data);
      setForm();
    }
  };

  const onCloseHandler = () => {
    setForm();
  };

  return (
    <form className="form" onSubmit={onSubmitHandler}>
      <h2 className="form-title">Переименовать</h2>
      <input type="text" placeholder="new name" ref={newFileName} />
      <input type="submit" value="OK" required />
      <button
        className="close"
        onClick={onCloseHandler}
        type="button"
        aria-label="Close"
      >
        <img
          src={img}
          alt="close"
        />
      </button>
    </form>
  );
}

FileRenameForm.propTypes = {
  currentFile: PropTypes.instanceOf(Object).isRequired,
  setForm: PropTypes.func.isRequired,
  setFiles: PropTypes.func.isRequired,
};

export default FileRenameForm;
