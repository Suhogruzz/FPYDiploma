import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../api/requests';
import { validateUsername, validatePassword } from './validateForm';
import Preloader from '../Preloader/Preloader';
import '../formStyle/Form.css';
import img from '../../../public/svg/icons8-close.svg';

function SignUpForm() {
  const email = useRef();
  const username = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const password = useRef();
  const password2 = useRef();

  const navigate = useNavigate();

  const [sendRequest, setSendRequest] = useState(false);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({});
  const [err, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await signUp(formData);
      const data = await response.data;
      if (!response.status === 200) {
        setError(Object.values(data));
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigate('/sign-in/');
    };

    if (sendRequest) {
      fetchData();
    }
  }, [sendRequest]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (page === 1) {
      const usernameIsValid = validateUsername(username.current.value);
      const passwordIsValid = validatePassword(password.current.value);

      if (!usernameIsValid.ok) {
        setError([usernameIsValid.message]);
        return;
      }

      if (!passwordIsValid.ok) {
        setError([passwordIsValid.message]);
        return;
      }

      setFormData({
        email: email.current.value,
        username: username.current.value,
        password: password.current.value,
        password2: password2.current.value,
      });

      setError();
      setPage(2);
      email.current.value = '';
      username.current.value = '';
      return;
    }
    const secondPageFormData = {
      first_name: firstName ? firstName.current.value : null,
      last_name: lastName ? lastName.current.value : null,
    };
    setFormData(Object.assign(formData, secondPageFormData));
    setSendRequest(true);
  };

  return (
    <>
      <form className="form" onSubmit={onSubmitHandler}>
        <h2 className="form--title">Sign Up</h2>
        {page === 1
          ? (
            <>
              <input type="email" placeholder="email*" ref={email} required />
              <input type="text" placeholder="имя пользователя*" ref={username} required />
              <input type="password" placeholder="пароль*" ref={password} required />
              <input type="password" placeholder="повторите пароль*" ref={password2} required />
              <input type="submit" value="Зарегестрироваться" />
            </>
          )
          : (
            <>
              <input type="text" placeholder="имя" ref={firstName} />
              <input type="text" placeholder="фамилия" ref={lastName} />
              <input type="submit" value="OK" />
            </>
          )}
        { err ? err.map((a) => <span key={err.indexOf(a)}>{ a }</span>) : null }
        <button className="close" type="button" aria-label="Close"><Link to="/"><img src={img} alt="close" /></Link></button>
      </form>
      { isLoading ? <Preloader /> : null }
    </>
  );
}

export default SignUpForm;
