import type { AppProps } from 'next/app'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { trpc } from '@/utils/trpc'

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default trpc.withTRPC(App)
