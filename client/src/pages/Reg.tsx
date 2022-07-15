import React, { ChangeEvent, FC, useState } from 'react';
import Form from '../components/Form/Form';
import { IUser } from '../types/types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Reg: FC<Props> = () => {
  const [user, setUser] = useState<IUser>({
    name: '',
    password: '',
  });
  const navigate = useNavigate();

  const createUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/create', {
        name: user.name,
        password: user.password,
      })
      .then(() => {
        console.log('user created');
        navigate('/auth');
      });
    setUser({
      name: '',
      password: '',
    });
  };

  return (
    <>
      <Form>
        <input
          type='text'
          placeholder='Name...'
          value={user.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, name: e.target.value })
          }
        />
        <input
          type={'password'}
          placeholder='Password...'
          value={user.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, password: e.target.value })
          }
        />
        <button onClick={createUser}>Register</button>
      </Form>
    </>
  );
};

export default Reg;
