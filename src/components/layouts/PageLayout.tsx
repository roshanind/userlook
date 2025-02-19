import { usePageDetails } from '@providers/PageDetailsProvider';
import { Grid, styled, Typography } from '@ui';
import { Outlet } from 'react-router';

export default function PageLayout() {
  const { title, isFixedLayout } = usePageDetails();

  return (
    <Content container>
      <Grid size={12}>
        <Typography variant="h1">{title}</Typography>
      </Grid>
      <Grid size={12} flexGrow={1} display="flex" overflow={isFixedLayout ? 'hidden' : 'auto'}>
        <Outlet />
      </Grid>
    </Content>
  );
}

const Content = styled(Grid)`
  max-height: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  padding: ${({ theme }) => theme.spacing(2)};
`;
