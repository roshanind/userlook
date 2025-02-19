import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';

import { persistor, store } from '@store/storeConfig';
import { FORM_MODE } from '@constants/form.constants';
import { PageDetailsProvider } from '@providers/PageDetailsProvider';

import GlobalStyles from '@ui/theme/GlobalStyles';
import { theme } from '@ui/theme';

import AppLayout from '@layouts/AppLayout';
import PageLayout from '@layouts/PageLayout';

import Dashboard from '@pages/Dashboard';
import UsersPage from '@pages/UsersPage';
import UsersViewEditCreate from '@pages/UsersViewEditCreate';

import Header from '@globals/Header';
import SideBar from '@globals/SideBar';
import Footer from '@globals/Footer';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <PageDetailsProvider>
            <BrowserRouter  basename="/userlook">
              <Routes>
                <Route element={<AppLayout header={<Header />} sidebar={<SideBar />} footer={<Footer />} />}>
                  <Route index element={<Dashboard />} />
                  <Route element={<PageLayout />}>
                    <Route path="manage-users">
                      <Route index element={<UsersPage />} />
                      <Route path="edit-user/:id" element={<UsersViewEditCreate />} />
                      <Route path="create-user" element={<UsersViewEditCreate mode={FORM_MODE.CREATE} />}  />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </PageDetailsProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
