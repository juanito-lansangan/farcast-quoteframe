/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { Box, Text, vars, Image, Spacer } from './ui'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  ui: { vars },
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'
app.frame('/', (c) => {
  return c.res({
    action: '/submit',
    image: (
      <Box
        grow
        alignHorizontal="center"
        alignVertical="center"
        backgroundImage="url('https://img.freepik.com/free-vector/white-clean-hexagonal-medical-concept_1017-29801.jpg?t=st=1714235743~exp=1714239343~hmac=a42e46d72b09dfe4904b2f69e0a42869d3eb2d8aad8652b93e02b70562950d00&w=2000')"
      >
        <Text color="black" font="passion" size="64">&ldquo;</Text>
        <Text color="black" size="32">
          Daily Inspirational Quotes
        </Text>
      </Box>
    ),
    intents: [
      <Button>Show Quote</Button>,
      <Button.Link href="https://warpcast.com/~/compose?text=Frame%20by%20@jplans-crypto&embeds[]=https://farcast-quoteframe.vercel.app/api">Share</Button.Link>
    ],
  })
});

app.frame('/submit', async (c) => {
  const response = await fetch('https://api.quotable.io/random?tags=inspirational')
  const {content, author} = await response.json();
  console.log(content, author)

  return c.res({
    action: '/',
    image: (
      <Box
        grow
        alignHorizontal="center"
        alignVertical="center"
        backgroundImage="url('https://img.freepik.com/free-vector/white-minimal-hexagons-background_79603-1452.jpg?t=st=1714235470~exp=1714239070~hmac=00544af8bfc49a7a72362a291827aded4a5658895609c4ece21a20d038037d15&w=2000')"
        padding="20"
        textAlign='center'
      >
        <Text color="black" font="passion" size="64">&ldquo;</Text>
        <Text color="black" size="24" align='center'>
          {content}
        </Text>
        <Spacer />
        <Text color="black" size="24">
          - {author}
        </Text>
        <Text color="black" font="passion" size="64">&rdquo;</Text>
      </Box>
    ),
    intents: [
      <Button.Link href="https://warpcast.com/~/compose?text=Frame%20by%20@jplans-crypto&embeds[]=https://farcast-quoteframe.vercel.app/api">Share</Button.Link>,
      <Button>Start Over</Button>
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
