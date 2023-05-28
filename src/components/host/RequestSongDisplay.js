import { Typography, Grid, Button, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStore, addSession } from '../../store/store';
import SongTileHost from './SongTileHost';
import { doc, onSnapshot, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { createSession } from '../../services/api';
import Cookies from 'universal-cookie';

const RequestSongDisplay = () => {
  const cookies = new Cookies();
  const [messages, setMessages] = useState([]);
  const store = useStore();
  const [session, setSession] = useState(store.currentSession);
  const theme = useTheme();
  

  async function handleCreateSession() {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 12 * 60 * 60 * 1000);
    const currentSession = await createSession();
    cookies.set('current_session', currentSession, { expires: expirationDate });
    setSession(currentSession);
    addSession(currentSession);
  }

  const removeSong = async (index) => {
    const messageRef = doc(db, 'sessions', session);
    const trackId = messages[index].track.id;

    if (!trackId) {
      console.error('Error: trackId is undefined or empty');
      return;
    }
    await updateDoc(messageRef, {
      [`requested.${trackId}`]: deleteField(),
    });

    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
  };

  useEffect(() => {
    if (session !== '' && session !==undefined) {
      const unsub = onSnapshot(doc(db, 'sessions', session), (doc) => {
        console.log('Current data: ', doc.data().requested);
        var resultsArray = [];
        try {
          Object.keys(doc.data().requested).forEach(function (key, index) {
            resultsArray.push(doc.data().requested[key]);
          });
        } catch (err) {
          console.log('has no results');
        }
        if (Object.keys(doc.data().requested).length !== 0) {
          setMessages(resultsArray);
        }
      });
    }
  }, [session]);

  return (
    <Grid container spacing={0} sx={{ padding:0,justifyContent: 'center', textAlign: 'center', margin: 0,  width:'100%',padding:'10px' }}>
      {session !== '' && session !==undefined ? (
        <>
          <Grid sx={{ marginBottom: '15px' }} item xs={12}>
            <Typography variant={'h5'}>Songs Requested</Typography>
          </Grid>
          {messages.length > 0 ? (
            messages.map((song, idx) => {
              return <SongTileHost key={idx} song={song.track} names={song.names} removeSong={() => removeSong(idx)} />;
            })
          ) : (
            <Typography>No new messages</Typography>
          )}
        </>
      ) : (

          <Button variant="contained" onClick={() => handleCreateSession()}>Create Session</Button>

      )}
    </Grid>
  );
};

export default RequestSongDisplay;
