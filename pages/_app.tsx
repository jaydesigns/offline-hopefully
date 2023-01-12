import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SmoothScrollProvider } from '../public/context/SmoothScroll.context'
import { useRef } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const containerRef = useRef(null)
  return (
    <SmoothScrollProvider containerRef={containerRef}>
      <main data-scroll-container className="container">
        <Component {...pageProps} />
      </main>
    </SmoothScrollProvider>
  )
}
