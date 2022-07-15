import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../types/types';

type Props = {};

const Home: FC<Props> = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(
    JSON.parse(localStorage.getItem('user') as string)
  );
  useEffect(() => {
    localStorage.setItem('test', 'test');
    if (user) {
      const { id }: IUser = user;

      if (!(id === Number(params.id))) {
        navigate('/auth');
      }
      // console.log(JSON.parse(localStorage.getItem('user') as string));
    } else {
      navigate('/auth');
    }
  }, [user]);

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };
  return (
    <div>
      Page of user with id: {params.id}
      <button onClick={Logout}>Logout</button>
    </div>
  );
};

export default Home;
