import { ReactNode } from 'react';
import { Outlet } from 'react-router';

import { Grid } from '@ui';

type Props = {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
};

export default function AppLayout({ header, sidebar, footer }: Props) {
  return (
    <Grid container flexDirection="column" flexWrap="nowrap" sx={{ height: '100vh' }}>
      <Grid size={12}>{header}</Grid>
      <Grid container size={12} flexGrow={1} overflow="hidden" flexDirection={{ xs: 'column', md: 'row' }} flexWrap={{ xs: 'nowrap', md: 'nowrap' }}>
        <Grid size={{ xs: 12, md: 'auto' }} sx={{ width: { md: 320 }, p: 2 }}>
          {sidebar}
        </Grid>
        <Grid size={{ xs: 12, md: 'grow' }} p={2} pb={0} sx={{ overflow: 'auto', height: '100%' }}>
          <Outlet />
        </Grid>
      </Grid>
      <Grid size={12}>{footer}</Grid>
    </Grid>
  );
}
