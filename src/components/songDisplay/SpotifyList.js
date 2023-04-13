//List of songs added by user to be uploaded to spotify

import { useEffect, useState, memo } from "react";

import { Button, Typography } from "@mui/material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";

export default function SpotifyList(props) {
  const columnsTwo = [
    { field: "_Name", headerName: "Song Name", width: 200 },
    {
      field: "spotify",
      headerName: "In Spotify?",
      width: 90,
    },
    {
      field: "add",
      headerName: "Add to list",
      width: 90,
      renderCell: (song) =>
        props.addedTracks.has(song.row) ? (
          <Button variant="contained" size="small" onClick={() => props.removeTracks(song.row)}>
            -
          </Button>
        ) : null,
    },
  ];

  const SpotifySongs = memo(() => {
    return (
      <DataGrid
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows={Array.from(props.addedTracks).map((track) => {
          return track;
        })}
        columns={columnsTwo}
        getRowId={(row) => row._TrackID}
        slots={{ toolbar: GridToolbarQuickFilter }}
        autoHeight
      />
    );
  });

  return (
    <div>
      <Typography variant="h1">Added Songs</Typography>
      <SpotifySongs />
    </div>
  );
}
