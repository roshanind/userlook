import { createTheme, PaletteOptions, alpha, darken } from '@mui/material';
import { grey, common, yellow, teal } from '@mui/material/colors';

const lightColors = {
  primary: {
    lighter: alpha('#e0f2f1', 0.2),
    light: '#e0f2f1',
    main: '#26a69a',
    dark: '#00897b',
    darker: '#004d40',
    darkest: darken('#004d40', 0.2),
    ...teal,
  },
  secondary: {
    main: '#2979ff',
    100: '#ff7043',
    color1: yellow,
  },
  grey,
  common,
};

const darkColors = {
  primary: {
    lighter: alpha('#004d40', 0.2),
    light: '#004d40',
    main: '#26a69a', // Kept the same as light theme for continuity
    dark: '#00897b',
    darker: '#004d40', // Darker base
    darkest: darken('#004d40', 0.3), // Darkened for more contrast
    ...teal,
  },
  secondary: {
    main: '#2979ff',
    100: '#ff7043',
    color1: yellow,
  },
  grey,
  common,
};

// Store the font size for h1
const h1FontSize = '2rem'; // 32px in rem

// Function to calculate the margin-bottom based on font size
const calculateMarginBottom = (fontSize: string) => {
  const baseFontSize = parseFloat(fontSize); // Extract numeric value from 'rem'
  return `${baseFontSize / 1.2}rem`; // Margin is 1/4th of the font size
};

const baseTheme = createTheme({
  colorSchemes: {
    light: {
      palette: lightColors as PaletteOptions,
    },
    dark: {
      palette: darkColors as PaletteOptions,
    },
  },
  typography: {
    fontFamily: 'Urbanist, sans-serif',
    htmlFontSize: 17.7, // base / default font size is 17.7px. 14px in rem is 0.9rem so 16/17.7 = 0.9
    h1: {
      fontSize: h1FontSize,
      marginBottom: calculateMarginBottom(h1FontSize),
      fontWeight: 'bold',
    },
    h2: {
      fontSize: `calc(${h1FontSize} * 0.9)`, // 28.8px
      marginBottom: calculateMarginBottom(`calc(${h1FontSize} * 0.9)`),
    },
    h3: {
      fontSize: `calc(${h1FontSize} * 0.8)`, // 25.6px
      marginBottom: calculateMarginBottom(`calc(${h1FontSize} * 0.8)`),
    },
    h4: {
      fontSize: `calc(${h1FontSize} * 0.7)`, // 22.4px
      marginBottom: calculateMarginBottom(`calc(${h1FontSize} * 0.7)`),
    },
    h5: {
      fontSize: `calc(${h1FontSize} * 0.6)`, // 19.2px
      marginBottom: calculateMarginBottom(`calc(${h1FontSize} * 0.6)`),
    },
    h6: {
      fontSize: `calc(${h1FontSize} * 0.5)`, // 16px
      marginBottom: calculateMarginBottom(`calc(${h1FontSize} * 0.5)`),
    },
  },
});

export const customShadows = {
  pageShadow: `3px -3px 10px 6px  ${alpha(baseTheme.palette.primary.darkest as string, 0.3)}`,
};

export const theme = createTheme(baseTheme, {
  customShadows,
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: baseTheme.palette.primary.darker,
            '&:hover': {
              backgroundColor: baseTheme.palette.primary.main,
            },
          },
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            backgroundColor: baseTheme.palette.primary.main,
            '&:hover': {
              backgroundColor: baseTheme.palette.primary.darker,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          borderRadius: 17,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // borderRadius: 16,
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'contained-heading' },
          style: {
            fontSize: '1rem',
            backgroundColor: baseTheme.palette.primary.light,
            borderRadius: 12,
            padding: '12px 16px',
            display: 'flex',
            fontWeight: 600,
            color: baseTheme.palette.primary.main,
            lineHeight: 1.1,
          },
        },
      ],
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${alpha(baseTheme.palette.primary[100] as string, 0.5)}`,
          '&:last-child': {
            borderBottom: 'none',
          },
        },
      },
    },
    MuiListItemButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 24,
          '&.Mui-selected, &.Mui-selected.Mui-focusVisible': {
            backgroundColor: baseTheme.palette.primary.dark,
            color: baseTheme.palette.common.white,
            '&:hover': {
              backgroundColor: baseTheme.palette.primary.darker,
            },
            '& + .MuiListItemSecondaryAction-root .MuiSvgIcon-root': {
              color: baseTheme.palette.common.white,
            },
            '& .MuiInputBase-root': {
              color: baseTheme.palette.common.white,
              backgroundColor: 'transparent',
            },
            '& + .MuiListItemSecondaryAction-root .Mui-disabled': {
              opacity: 0.5,
            },
          },
          '& .MuiInputBase-root': {
            '& .MuiInputBase-input': {
              height: '2.102em',
              paddingTop: 0,
              paddingBottom: 0,
            },
          },
          '&:hover': {
            backgroundColor: baseTheme.palette.primary[100],
          },
          transition: 'background-color 0.3s',
        },
      },
    },
    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
          right: 8,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { variant: 'tag', size: 'small' },
          style: {
            borderRadius: 12,
            backgroundColor: baseTheme.palette.primary.lighter,
            color: baseTheme.palette.primary.main,
            padding: '5px 0px 3px 0px',
            fontSize: '0.5rem',
            fontWeight: 600,
            textTransform: 'uppercase',
          },
        },
      ],
    },
  },
});
