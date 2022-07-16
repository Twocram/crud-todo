import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../components/Form/Form';
import { IUser, ITodo } from '../types/types';
import axios from 'axios';

type Props = {};

const Home: FC<Props> = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState<ITodo>({
    title: '',
  });
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

  const createTask = () => {
    axios
      .post('http://localhost:3001/api/todos/create', {
        title: todo.title,
        id_user: params.id,
      })
      .then(() => {
        console.log('task created');
      });
  };

  const getTasks = () => {
    axios.get(`http://localhost:3001/api/todos/${params.id}`).then((res) => {
      console.log(res.data);
    });
  };

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };
  return (
    <div>
      Page of user with id: {params.id}
      <button onClick={Logout}>Logout</button>
      <Form>
        <input
          type='text'
          placeholder='title'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTodo({ ...todo, title: e.target.value })
          }
        />
        <button onClick={createTask}>Create task</button>
        <button onClick={getTasks}>Get task</button>
      </Form>
    </div>
  );
};

export default Home;
