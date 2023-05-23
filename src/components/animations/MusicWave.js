import { useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTrail, animated } from 'react-spring';

const MusicWave = () => {

  const theme = useTheme();
  const barStyles = {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    width: '2px',
    marginLeft: '2px',
  };

  const bars = Array.from({ length: 110 }, (_, index) => index + 1);



  const animationProps = useTrail(bars.length, {
    loop: { reverse: true },
    from: { scaleY: 0.2 },
    to: { scaleY:  0.6 },
    config: { mass: 1.4, tension: 580, friction: 35 },
    delay: bars.map((_, index) => index -50),
  });



  return (
    <div style={{ width: '440px', height: '60px', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', overflowX: 'clip' }}>
      {animationProps.map((animation, index) => (
        <animated.div key={bars[index]} style={{ ...barStyles, ...animation }} />
      ))}
    </div>
  );
};

export default MusicWave;
