// header component with logo on left side and menu on right side with theme toggle using material ui

import { Box, styled } from '@ui';
import ThemeToggle from '@globals/ThemeToggle';

export default function Header() {
  return (
    <HeaderWrapper>
      <Box>
        <img style={{ width: 146 }} src="images/logo.svg" alt="Logo" />
      </Box>
      <Box>
        <ThemeToggle />
      </Box>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled(Box)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  position: sticky;
  top: 0;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
