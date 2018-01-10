import React from 'react';

export default function Topbar(props) {
  return (
    <div className={props.completed ? 'top-bar completed' : 'top-bar'}>
      <span>data hydration</span>
    </div>
  );
}