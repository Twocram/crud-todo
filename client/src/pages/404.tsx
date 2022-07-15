import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Error = (props: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/reg');
    }, 5000);
  }, []);
  return <div>This page is not exist. You will be redirect from 5 seconds</div>;
};

export default Error;
