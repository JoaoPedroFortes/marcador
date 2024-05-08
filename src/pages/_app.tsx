import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Home from '../components/navbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <Home>
    <Component {...pageProps} />
  </Home>
  )
}
