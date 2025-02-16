import "@emotion/react";

import { customShadows } from '.';
import { Theme as MuiTheme } from "@mui/material/styles";


declare module "@emotion/react" {
  export interface Theme extends MuiTheme {
    _?: never;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'contained-heading': true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    tag: true;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    customShadows?: typeof customShadows;
  }

  interface ThemeOptions {
    customShadows?: typeof customShadows;
  }

  interface PaletteColor {
    lighter?: string;
    darker?: string;
    darkest?: string;
    color1?: PaletteColor;
    color2?: PaletteColor;
    color3?: PaletteColor;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    A100?: string;
    A200?: string;
    A300?: string;
    A400?: string;
  }
}
