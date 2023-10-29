import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import { Navigation } from './Navigation';
import { Loader } from './Loader';

export const Layout = () => {
  return (
    <div>
      <header className='flex items-center justify-end bg-[#3f51b5] px-6 py-3 text-black shadow shadow-blue-500'>
        <Navigation />
      </header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Toaster position='top-right' />
    </div>
  );
};
