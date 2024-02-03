import PropTypes from 'prop-types';
import React, { useRef, useState, useContext } from 'react';
import Context from '../../../../GlobalState/state';
import './FileInput.css';

function FileInput({ sendFile }) {
  const file = useRef();
  const [fileChosen, setFileChosen] = useState();
  const { currentStorageUser } = useContext(Context);

  const onChangeHandler = () => {
    setFileChosen(file.current.files);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    sendFile(fileChosen.item(0));
    setFileChosen();
    file.current.value = '';
  };

  return (
    !currentStorageUser
      ? (
        <form className="file-input-form" onSubmit={onSubmitHandler}>
          <div className="input-wrapper button">
            <label htmlFor="input_file">
              Загрузить файл
              <input
                type="file"
                id="input_file"
                ref={file}
                onChange={onChangeHandler}
              />
            </label>
            { fileChosen && fileChosen.length
              ? <div className="preview">{ fileChosen.item(0).name }</div>
              : null }
          </div>
          { fileChosen && fileChosen.length
            ? <input className="uploadbtn" type="submit" value="" />
            : null }
        </form>
      )
      : null
  );
}

FileInput.propTypes = {
  sendFile: PropTypes.func.isRequired,
};

export default FileInput;
