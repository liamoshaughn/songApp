import { Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/store';
import SongTile from '../SongTile';
import { doc, onSnapshot, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const RequestSongDisplay = () => {
  const [messages, setMessages] = useState([]);
  const store = useStore();

  const removeSong = async (index) => {
    const messageRef = doc(db, 'messages', 'n3MXGUdK0o3qmTusdFNP');
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
    const unsub = onSnapshot(doc(db, 'messages', 'n3MXGUdK0o3qmTusdFNP'), (doc) => {
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
  }, []);

  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center', textAlign: 'center' }}>
      <Grid sx={{ mb: '15px' }} item xs={12}>
        <Typography variant={'h5'}>Songs Requested</Typography>
      </Grid>
      {messages.length > 0 ? (
        messages.map((song, idx) => {
          return <SongTile key={idx} song={song.track} names={song.names} removeSong={() => removeSong(idx)} />;
        })
      ) : (
        <Typography>No new messages</Typography>
      )}
    </Grid>
  );
};

export default RequestSongDisplay;
