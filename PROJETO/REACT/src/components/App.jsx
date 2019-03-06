import React, { Component } from 'react';

function App(props) {
  const { name } = props;
  return (
    <div>
      Hello
      {name}
    </div>
  );
}

export default App;
