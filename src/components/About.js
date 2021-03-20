import React from 'react';
import { Card } from '@material-ui/core';

const About = () => {
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
          <h2>Trochę o mnie...</h2>
          <p>
            Nazywam się Jakub Szczepański a to mój projekt zaliczeniowy z
            przedmiotu Frontend Development.
          </p>
          <p>
            Strona ma połączenie z bazą danych na MongoDB, możemy dodawać,
            usuwać oraz edytować utwory, to samo tyczy sie postów oraz
            komentarzy.
          </p>
          <h2>Zapraszam!</h2>
        </div>
      </Card>
    </div>
  );
};

export default About;
