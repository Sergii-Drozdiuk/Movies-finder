import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import { Navigation } from './Navigation';
import { Loader } from './Loader';

export const Layout = () => {
  return (
    <div>
      <header className='flex items-center bg-[#3f51b5] px-6 py-3 text-black shadow shadow-blue-500'>
        <Navigation />
      </header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
};
