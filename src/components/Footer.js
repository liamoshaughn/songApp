import { Typography, Box, useTheme, Link } from '@mui/material';
import React from 'react';


function Footer(){
 const theme = useTheme();
  return (
    <Box sx={{ height: '7vh', width: '100vw', textAlign:"center", marginTop: 'auto'}}><Typography sx={{ color: theme.palette.background.paper,}} >Website by <Link style={{ color: theme.palette.background.paper ,textDecorationColor: theme.palette.background.paper,}}href="mailTo:liamoshaughn@gmail.com.au">Liam O'Shaughnessy</Link></Typography></Box>
  );
}

export default Footer;
