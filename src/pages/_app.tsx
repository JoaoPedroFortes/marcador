import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Home from '../components/navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import useAuth from '@/utils/hooks/useAuth';
import Footer from '@/components/footer/footer';
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noHomeLayout = ["/login"];
  const noProtectedRoutes = ["/login"];

  const {isLoading} = useAuth(noProtectedRoutes);
  
  if (isLoading) {
    return <div>...</div>;
  }

  return (
    <>
      {!noHomeLayout.includes(router.pathname) && <Home children={undefined} />}
      <ToastContainer />
      <Component {...pageProps} />
      <Footer></Footer>
    </>
  )
}
