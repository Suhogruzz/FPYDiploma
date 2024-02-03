import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../../GlobalState/state';
import './StartPage.css';
import img from '../../../public/svg/cloud.svg';

function StartPage() {
  const navigate = useNavigate();
  const { sessionId } = useContext(Context);

  const onClickHandler = () => {
    navigate('/sign-up/');
  };

  useEffect(() => {
    if (sessionId) {
      navigate('/my-storage/');
    }
  }, [sessionId]);

  return (
    !sessionId
      ? (
        <section className="start-page">
          <div className="start-page--welcome">
            <h1 className="start-page--welcome--title">
              MyCloud - это простое облачное хранилище с базовым функционалом,
              для хранения ваших файлов.
            </h1>
            <button className="sign-up-button" onClick={onClickHandler} type="button">Попробовать</button>
          </div>
          <img className="start-page--image" src={img} alt="MyCloud_tree" />
        </section>
      )
      : null
  );
}

export default StartPage;
