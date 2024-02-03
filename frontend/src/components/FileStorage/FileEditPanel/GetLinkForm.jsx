import React from 'react';
import PropTypes from 'prop-types';
import '../../formStyle/Form.css';
import img from '../../../../public/svg/icons8-close.svg';

let inputRef = null

function GetLinkForm({ link, setForm }) {
  const onCloseHandler = () => {
    setForm();
  };

function CopyToClipboard() {
  inputRef.select();
  navigator.clipboard.writeText(inputRef.value)
}

  return (
    <form className="form">
      <h2 className="form--title">Ваша ссылка для скачивания</h2>
      <input type="text" ref={(ref) => inputRef = ref} onClick={CopyToClipboard} readOnly value={link} />
      <p className='description'>Нажмите на ссылку чтобы скопировать</p>
      <button className="close" onClick={onCloseHandler} aria-label="Close" type="button"><img src={img} alt="close" /></button>
    </form>
  );
}

GetLinkForm.propTypes = {
  link: PropTypes.string.isRequired,
  setForm: PropTypes.func.isRequired,
};

export default GetLinkForm;
