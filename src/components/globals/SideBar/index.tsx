import { NavLink, useLocation } from 'react-router';

import { List, ListItemButton, ListItemIcon, ListItemText } from '@ui';
import { PeopleIcon, SpaceDashboardIcon } from '@ui/icons';
import { usePageDetails } from '@providers/PageDetailsProvider';
import { useEffect } from 'react';

const menuItems = [
  { text: 'Dashboard', icon: <SpaceDashboardIcon />, path: '/' },
  { text: 'Manage Users', icon: <PeopleIcon />, path: '/manage-users' },
];

export default function SideBar() {
  const { setTitle } = usePageDetails();
  const { pathname } = useLocation();

  useEffect(() => {
    const menuItem = menuItems.find((item) => item.path === pathname);
    if (menuItem) setTitle(menuItem.text);
  }, []);

  return (
    <List>
      {menuItems.map(({ text, icon, path }) => (
        <ListItemButton
          onClick={() => setTitle(text)}
          key={text}
          component={NavLink}
          to={path}
          sx={{
            '&.active': { backgroundColor: 'primary.light', color: 'primary.main' },
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </List>
  );
}
