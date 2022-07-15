import React from 'react';

type Props = {
  children: React.ReactElement | React.ReactNode;
};

const Layout = (props: Props) => {
  return <div className='wrapper'>{props.children}</div>;
};

export default Layout;
