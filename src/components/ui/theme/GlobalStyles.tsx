import { GlobalStyles as MaterialGlobalStyles } from '@mui/material';

export default function GlobalStyles() {
  return (
    <MaterialGlobalStyles
      styles={(theme) => ({
        html: {
          fontSize: 16,
          height: '100%',
        },
        body: {
          height: '100%',
        },
        '#root': {
          height: '100%',
        },
        '::-webkit-scrollbar': {
          width: '7px' /* width of the entire scrollbar */,
          height: '7px' /* height of the entire scrollbar */,
        },
        '::-webkit-scrollbar-track': {
          background: 'transparent' /* color of the tracking area */,
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.primary.main /* color of the scroll thumb */,
          borderRadius: '6px' /* roundness of the scroll thumb */,
          transition: 'all 0.3s',
          cursor: 'pointer',
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme.palette.primary.dark /* color of the scroll thumb when hovered */,
        },
      })}
    />
  );
}
