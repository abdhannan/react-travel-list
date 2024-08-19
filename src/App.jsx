import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CitiesProvider } from './Contexts/CitiesContext';
import { AuthProvider } from './Contexts/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import HomePage from './pages/HomePage';
// import AppLayout from './pages/AppLayout';
// import PageNotFound from './pages/PageNotFound';
// import Login from './pages/Login';

// dist/assets/index-19520ae9.css   29.96 kB │ gzip:   5.06 kB
// dist/assets/index-0907d129.js   509.35 kB │ gzip: 148.81 kB

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';

// Dynamicn import / lazy loading
const HomePage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='product' element={<Product />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='login' element={<Login />} />
              <Route
                path='app'
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to='cities' />} />
                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path='countries' element={<CountryList />} />
                <Route path='form' element={<Form />} />
                <Route
                  path='*'
                  element={
                    <center>
                      <p>NOT FOUND CUK</p>
                    </center>
                  }
                />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
