import React from 'react';
import { Card } from '@material-ui/core';

const Kontakt = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%',
      }}
    >
      <Card
        style={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-center',
          padding: '2rem',
          borderRadius: '28px',
          marginTop: '1rem',
          fontWeight: 'bold',
          fontFamily: 'Helvetica',
          color: 'black',
        }}
      >
        <div className="All">
          <h2>Kontakt</h2>
          <p>email: jszczepansky@protonmail.com</p>
        </div>
      </Card>
    </div>
  );
};

export default Kontakt;
