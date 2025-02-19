import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTheme, toggleTheme } from '@store/slices/app.slice';
import { THEME } from '@constants/app.constants';
import { FormControlLabel, styled, Switch, Tooltip, useColorScheme } from '@ui';
import { DarkModeIcon, LightModeIcon } from '@ui/icons';


export default function ThemeToggle() {
  const { setMode } = useColorScheme();
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    setMode(theme as 'light' | 'dark');
  }, [theme, setMode]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Tooltip title={`Switch to ${theme === THEME.LIGHT ? 'Dark' : 'Light'} Theme`}>
      <FormControlLabel
        control={
          <Switch
            checked={theme === 'dark'}
            onChange={handleToggleTheme}
            color="default"
            icon={<IconWrapper><LightModeIcon /></IconWrapper>}
            checkedIcon={<IconWrapper><DarkModeIcon /></IconWrapper>}
          />
        }
        label=""
      />
    </Tooltip>
  );
};

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transform: translate(0, -2px);
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
`