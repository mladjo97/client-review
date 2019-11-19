import React from 'react';

const Main = (props) => {
  return (
    <div>
      <section>
        {props.children}
      </section>
    </div>
  );
}

export default Main;