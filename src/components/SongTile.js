import { Button, Typography, Grid, Box, useTheme } from '@mui/material';
import React from 'react';
import { addToQueue } from '../services/api';
import { usePostMessageMutation } from '../services/api';
import { useStore } from '../store/store';
export default function SongTile({ song, name }) {
  const sendMessage = usePostMessageMutation();
  const store = useStore();
  const theme = useTheme();

  function handleSend() {
    sendMessage.mutate({ message: song.id, name: name });
  }

  return (
    <Grid sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} item xs={12}>
      {/* https://tanstack.com/query/latest/docs/react/guides/mutations */}
      {sendMessage.isSuccess && (
        <Box
          sx={{
            width: 500 * 0.9 + 'px',
            height: 120 * 0.9 + 'px',
            position: 'absolute',
            backgroundColor: theme.palette.success.main,
            zIndex: '100',
            opacity: '0.97',
            boxShadow: '0 0 10px 10px ' + theme.palette.success.main,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Song Sent
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          width: '500px',
          height: '120px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img style={{ maxWidth: '100px' }} alt="Album Cover" src={song.album.images[1].url} />
        <div style={{ paddingLeft: '15px', width: '220px' }}>
          <Box>
            <Typography sx={{ fontWeight: 'bold' }}>
              {new Date(song.album.release_date).toLocaleString('en-AU', {
                year: 'numeric',
              })}
            </Typography>
          </Box>

          <Typography sx={{ typography: { sm: 'body2', xs: 'body2' } }}>{song.name}</Typography>
          <Typography sx={{ fontWeight: 'bold' }}>
            {song.artists
              .map((artist) => {
                return artist.name;
              })
              .join(', ')}
          </Typography>
        </div>
        <div>
          <Button
            variant="contained"
            sx={{ height: '30px', margin: '10px' }}
            onClick={() => {
              handleSend();
            }}
          >
            Request
          </Button>
        </div>
      </Box>
    </Grid>
  );
}
