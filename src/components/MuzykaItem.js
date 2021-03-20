import { Box, Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const MuzykaItem = ({ songs }) => {
  const { push } = useHistory();
  const [song, setSong] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const songFound = songs.find((p) => p.id === id);
    if (!songFound) {
      alert('Utwór nie istnieje');
      push('/music');
    } else {
      setSong(songFound);
    }
  }, [id, push, songs]);

  console.log(song);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%',
      }}
    >
      <Box width="100%" display="flex" justifyContent="space-around" mt="2rem">
        <Card
          style={{
            width: '35%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            // marginLeft: '-50px',
            padding: '2rem',
            fontFamily: 'Helvetica',
            fontWeight: 'bold',
              borderRadius: '28px',
              justifyContent: 'center'
          }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '3px',
                width: '100%',
                justifyContent: 'center',

            }}>
           <div style={{
               backgroundImage: 'linear-gradient(to bottom right,#dcdcdc, #e8f4f5)',
               borderRadius: '50%',
               // width: '50%',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               height: '350px',
               width: '350px',
               alignItems: 'center',
               boxShadow: 'inset 0 0 10px #000000',
               marginLeft: '15px',
               marginTop: '15px',
               marginBottom: '15px',
               marginRight: '15px',
               paddingTop: '10px',
               paddingBottom: '10px',
               paddingRight: '10px',
               paddingLeft: '10px',

           }}>
          <h1>Tytuł: {song.title}</h1>
          <h3>Autor utworu: {song.author}</h3>
          <h3>Data wydania: {song.release ?? 'Unknown'}</h3>
           </div>
            </div>
        </Card>
      </Box>
    </div>
  );
};

export default MuzykaItem;
