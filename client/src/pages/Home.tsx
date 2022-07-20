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
  const [todoList, setTodoList] = useState<ITodo[]>([]);
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
      setTodoList(res.data);
    });
  };

  const deleteTask = (id: number) => {
    setTodoList(todoList.filter((todo: ITodo) => todo.id !== id));
    axios
      .delete(`http://localhost:3001/api/todos/${id}&${params.id}`)
      .then(() => {});
  };

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };
  return (
    <div>
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
        <ul>
          {todoList.length > 0 &&
            todoList.map((todo) => (
              <li key={todo.id}>
                {todo.title}{' '}
                <button onClick={() => deleteTask(Number(todo.id))}>
                  Delete
                </button>
              </li>
            ))}
        </ul>

        {!todoList.length && <div>List is clear</div>}
      </Form>
    </div>
  );
};

export default Home;
