//Lists songs and playlists uploaded by user

import { useState } from "react";
import playlist from "../../data/playlistData.json";
import { Button, Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Box, List } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const playlistData = () => {
  var names = [];
  playlist.map((node) => {
    if (node.NODE) {
      names.push({ name: node._Name, list: node.NODE });
    } else {
      names.push({ name: node._Name, list: node.TRACK });
    }
  });
  return names;
};

export default function FilterPlaylist(props) {
  const [currentSelection, setCurrentSelection] = useState(playlistData);
  const [previousSelection, setPreviousSelection] = useState([]);
  const [path, setPath] = useState(["Home"]);

  function nextPage(node) {
    const list = node.list;
    try {
      if (list[0]._Name) {
        setPath(() => {
          return [...path, node.name];
        });
        setPreviousSelection(() => {
          var array = previousSelection;
          array.push(currentSelection);
          return array;
        });
        setCurrentSelection(() => {
          var names = [];
          list.map((node) => {
            if (node.NODE) {
              names.push({ name: node._Name, list: node.NODE });
            } else if (node.TRACK) {
              names.push({ name: node._Name, list: node.TRACK });
            }
          });
          return names;
        });
      } else props.listOfSongs(list);
    } catch (e) {
      if (list._Name) {
        console.log(list.TRACK);
        props.listOfSongs(list.TRACK);
      }
    }
  }

  return (
    <Grid container sx={{ width: "14vw", height: "100%" }}>
      <Grid item xs={12}>
        {path.length > 1 ? (
          <Button
            onClick={() => {
              setPath(() => {
                var array = path;
                array.pop();
                return array;
              });
              setPreviousSelection(() => {
                var array = previousSelection;
                setCurrentSelection(array.pop());
                return array;
              });
            }}
          >
            Back
          </Button>
        ) : (
          <Box />
        )}
        <Typography>
          {path.map((filePath) => {
            return "/" + filePath;
          })}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => {
            setPath(["Home"]);
            setCurrentSelection(playlistData);
            setPreviousSelection([]);
            props.allSongs();
          }}
        >
          All
        </Button>
      </Grid>
      {currentSelection.map((node) => {
        return (
          <Grid item xs={12}>
            <Button
              onClick={() => {
                nextPage(node);
              }}
            >
              {node.name}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
}
