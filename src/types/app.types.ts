import { THEME } from "@constants/app.constant";

export type AppState = {
  theme: typeof THEME[keyof typeof THEME];
};

export type PageDetailsContextProps = {
  title: string;
  setTitle: (title: string) => void;
  isFixedLayout: boolean;
  setIsFixedLayout: (isFixed: boolean) => void;
}
