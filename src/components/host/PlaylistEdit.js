//Lists songs and playlists uploaded by user

import { useState } from "react";

import { Button, Typography, Container, Grid, useTheme } from "@mui/material";
import { useStore } from "../../store/store";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";

export default function PlaylistEdit(props) {
  const theme = useTheme();
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
        width: "100%",
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
          height: "75vh",
          width: "100%",
          backgroundColor:theme.palette.background.paper,
          padding: '10px',
          "& .MuiDataGrid-withBorderColor": {
            borderColor: "transparent",
          },
          "& .css-rtrcn9-MuiTablePagination-root .MuiTablePagination-selectLabel": {
            display:'none',
          },
          "& .css-1bt9270-MuiInputBase-root-MuiTablePagination-select": {
            display:'none',
          },
          "& .css-rtrcn9-MuiTablePagination-root:last-child": {
            marginRight:'auto',
          }  
          
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
      />
    );
  }

  return (
      <PlaylistList list={userPlaylist} />
  );
}
