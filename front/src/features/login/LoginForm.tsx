import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import cookie from 'react-cookies';
import styled from 'styled-components';
import token from './data/data';

const Form = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.8em;
`;

const Input = styled.input`
  width: 18em;
  font-size: 4.5vw;
  padding: 0.8em 1.3em;
  outline: none;
  border: 2px solid rgba(49, 98, 199, 0.5);
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(49, 98, 199, 0.5);
  &:not(:last-child) {
    margin-bottom: 1em;
  }
`;

const Button = styled.button`
  width: 18em;
  text-align: center;
  padding: 1em 0;
  background: #6F96E9;
  font-weight: bold;
  color: #FFF;
  font-size: 4.5vw;
  border: none;
  border-radius: 200px;
  outline: none;
  margin-bottom: 1.2em;
`;

interface inputForm {
  email:string,
  passwd:string
}

const LoginForm:React.FC = () => {
  const [inputs, setInputs] = useState<inputForm>({
    email: '',
    passwd: '',
  });

  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onLogin = (e:React.FormEvent<HTMLFormElement>) => {
    const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    const isEmail = (text: string) => text.match(emailRegExp);
    const isSpace = (text: string) => text === '';

    const { email, passwd } = inputs;
    e.preventDefault();
    if (isSpace(email)) {
      alert('아이디가 입력되지 않았습니다.');
    } else if (isSpace(passwd)) {
      alert('비밀번호가 입력되지 않았습니다.');
    } else if (!isEmail(email)) {
      alert('아이디가 이메일 형식이 아닙니다.');
    } else {
      alert('로그인 요청');
      const result = token;
      const expires = new Date();
      expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);

      cookie.save(
        'access_token',
        result.data.accessToken,
        {
          path: '/',
          expires,
        },
      );

      cookie.save(
        'refresh_token',
        result.data.refreshToken,
        {
          path: '/',
          expires,
        },
      );

      console.log(cookie.loadAll());

      history.push('/home');
    }
  };

  return (
    <Form method="POST" onSubmit={onLogin}>
      <InputBox>
        <Input type="text" name="email" placeholder="아이디" value={inputs.email} onChange={handleChange} />
        <Input type="password" name="passwd" placeholder="비밀번호" value={inputs.passwd} onChange={handleChange} />
      </InputBox>
      <Button type="submit">로그인</Button>
    </Form>
  );
};

export default LoginForm;
