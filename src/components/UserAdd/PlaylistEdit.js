//Lists songs and playlists uploaded by user

import { useState } from "react";

import { Button, Typography, Container, Grid } from "@mui/material";
import { useStore } from "../../store/store";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";

export default function PlaylistEdit(props) {
  const [userPlaylist, setUserSongs] = useState(() => {
    var array = [];
    const list = props.playlists.items;
    for (var item in list) {
      array.push(list[item]);
    }
    return array;
  });

  function PlaylistList({ list }) {
    const columns = [
      {
        align: "center",
        field: "name",
        width: "100px",
        headerName: "Select a playlist to add",
        valueGetter: (item) => {
          return item.row.name;
        },
        renderCell: (item) => (
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              props.chosen(item.row);
            }}
          >
            {item.row.name}
          </Button>
        ),
      },
    ];

    return (
      <DataGrid
        sx={{
          border: 0,
          "& .MuiDataGrid-withBorderColor": {
            borderColor: "transparent",
          },
        }}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rows={list}
        columns={columns}
        getRowId={(item) => {
          return item.name;
        }}
        slots={{ toolbar: GridToolbarQuickFilter }}
        autoHeight
      />
    );
  }

  return (
    <Container>
      <PlaylistList list={userPlaylist} />
    </Container>
  );
}
