// npm
import type { JSX } from "solid-js/jsx-runtime"
import { MetaProvider, Title } from "solid-meta"

// self
import Nav from "~/components/nav"

function App(): JSX.Element {
  return (
    <MetaProvider>
      <Title>Title of page</Title>
      <Nav />
    </MetaProvider>
  )
}

export default App
