import React, { FC, useState } from 'react';
import Form from '../components/Form/Form';
import { IUser } from '../types/types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Auth: FC<Props> = () => {
  const [userInfo, setUserInfo] = useState<IUser>({
    name: '',
    password: '',
  });

  const navigate = useNavigate();

  const authUser = () => {
    axios
      .get(
        `http://localhost:3001/api/users/${userInfo.name}&${userInfo.password}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          localStorage.setItem('user', JSON.stringify(res.data[0]));
          navigate(`/users/${res.data[0].id}`);
        }
      });
  };

  return (
    <>
      <Form>
        <input
          type='text'
          placeholder='Name...'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserInfo({ ...userInfo, name: e.target.value })
          }
        />
        <input
          type='password'
          placeholder='Password...'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
        <button onClick={authUser}>Auth</button>
      </Form>
    </>
  );
};

export default Auth;
