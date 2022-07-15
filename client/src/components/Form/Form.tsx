import React, { FC } from 'react';
import s from './Form.module.css';

type Props = {
  children: React.ReactNode | React.ReactElement;
};

const Form: FC<Props> = ({ children }) => {
  return <div className={s.form}>{children}</div>;
};

export default Form;
