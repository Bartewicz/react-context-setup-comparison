import { createContext, useCallback, useContext, useState } from 'react'
import {
  Button,
  Card,
  Container,
  Link,
  NextUIProvider,
  Row,
  Spacer,
  Text,
} from '@nextui-org/react'
import './App.css'

const planets = [
  'World',
  'Mercury',
  'Venus',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
]
function noop() {}

function useInitialState() {
  const [planet, setPlanet] = useState(planets[0])
  const changePlanet = useCallback(() => {
    const randomIdx = Math.floor(Math.random() * planets.length)
    setPlanet(planets[randomIdx])
  }, [])
  return { planet, changePlanet }
}

const AppContext = createContext({ planet: '', changePlanet: noop })

function AppContextProvider({ children }) {
  const state = useInitialState()
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}

function ContextConsumerTitle() {
  const { planet } = useContext(AppContext)
  return (
    <Text h2 css={{ textGradient: '45deg, $yellow600 -20%, $red600 100%' }}>
      Hello {planet}!
    </Text>
  )
}

function ContextConsumerButton() {
  const { changePlanet } = useContext(AppContext)
  return <Button onClick={changePlanet}>Shuffle!</Button>
}

function ContextAgnosticParagraph({ children }) {
  return (
    <Card css={{ $$cardColor: '#111', p: '0 $sm', m: '$md 0' }}>
      <Card.Body>
        <Text css={{ textGradient: '45deg, $purple600 -20%, $pink600 100%' }}>
          Edit <pre style={{ display: 'inline' }}>src/App.js</pre> and save to
          reload. NextUI gives you the best developer experience with all the
          features you need for building beautiful and modern websites and
          applications.
        </Text>
        <Spacer />
        {children}
      </Card.Body>
    </Card>
  )
}

function ContextAgnosticLink() {
  return (
    <>
      <Link
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </Link>
      <Spacer />
    </>
  )
}

function AppWithInternalStateAndDirectContextProviderCall() {
  const state = useInitialState()
  return (
    <AppContext.Provider value={state}>
      <Container xs>
        <Text h2 css={{ textGradient: '45deg, $red600 -20%, $pink600 50%' }}>
          App with internal state passed to directly called AppContext.Provider:
        </Text>
        <ContextAgnosticParagraph>
          <ContextAgnosticLink />
          <ContextConsumerTitle />
        </ContextAgnosticParagraph>
        <ContextAgnosticParagraph>
          <ContextAgnosticLink />
          <ContextConsumerButton />
        </ContextAgnosticParagraph>
      </Container>
    </AppContext.Provider>
  )
}

function AppWithStateInsideContextProvider() {
  return (
    <AppContextProvider>
      <Container xs>
        <Text h2 css={{ textGradient: '45deg, $red600 -20%, $pink600 50%' }}>
          App with separate ContextProvider and state encapsulated inside:
        </Text>
        <ContextAgnosticParagraph>
          <ContextAgnosticLink />
          <ContextConsumerTitle />
        </ContextAgnosticParagraph>
        <ContextAgnosticParagraph>
          <ContextAgnosticLink />
          <ContextConsumerButton />
        </ContextAgnosticParagraph>
      </Container>
    </AppContextProvider>
  )
}

function Root() {
  return (
    <NextUIProvider>
      <section className="App">
        <Row>
          <AppWithInternalStateAndDirectContextProviderCall />
          <AppWithStateInsideContextProvider />
        </Row>
      </section>
    </NextUIProvider>
  )
}

export default Root
