import React from 'react';
import s from './Layout.module.css';

type Props = {
  children: React.ReactElement | React.ReactNode;
};

const Layout = (props: Props) => {
  return <div className={s.wrapper}>{props.children}</div>;
};

export default Layout;
