import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Host from './routes/Host'
import Auth from './services/Auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import themeSettings from "./theme/theme"
import { useSettings } from './store/store';


const queryClient = new QueryClient();
function App() {
  const settings = useSettings()
  const theme = themeSettings(settings);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Host />} />
          <Route path="/auth/callback" element={<Auth/>}/>
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
