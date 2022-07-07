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
  'Earth',
  'Mercury',
  'Venus',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
]
function noop() {}

function useChangingState() {
  const [planet, setPlanet] = useState(planets[0])
  const changePlanet = useCallback(() => {
    const randomIdx = Math.floor(Math.random() * planets.length)
    setPlanet(planets[randomIdx])
  }, [])
  return { planet, changePlanet }
}

const AppContext = createContext({ planet: '', changePlanet: noop })

function AppContextProvider({ children }) {
  const state = useChangingState()
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

function ContextAgnosticCard({ children }) {
  return (
    <Card css={{ $$cardColor: '#111', p: '0 $sm', m: '$md 0' }}>
      <Card.Body>{children}</Card.Body>
    </Card>
  )
}

function ContextAgnosticParagraph1({ children }) {
  return (
    <Card css={{ $$cardColor: '#111', p: '0 $sm', m: '$md 0' }}>
      <Card.Body>
        <Text css={{ textGradient: '45deg, $purple600 -20%, $pink600 100%' }}>
          The code for this implementation could look like this"
        </Text>
        <Text
          as="code"
          css={{ bg: '#0c0c0c', color: '$success', p: '$xs', m: '$sm 0' }}
        >
          {`function App() {
  const state = useChangingState()
  return (
    <AppContext.Provider value={state}>
      ...
    </AppContext.Provider>
}`}
        </Text>
        {children}
      </Card.Body>
    </Card>
  )
}

function ContextAgnosticParagraph2({ children }) {
  return (
    <Card css={{ $$cardColor: '#111', p: '0 $sm', m: '$md 0' }}>
      <Card.Body>
        <Text css={{ textGradient: '45deg, $purple600 -20%, $pink600 100%' }}>
          The code for this implementation could look like this"
        </Text>
        <Text
          as="code"
          css={{ bg: '#0c0c0c', color: '$success', p: '$xs', m: '$sm 0' }}
        >
          {`function App() {
  return (
    <AppContextProvider>
      ...
    </AppContextProvider>
}`}
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
    </>
  )
}

function AppWithInternalStateAndDirectContextProviderCall() {
  const state = useChangingState()
  return (
    <AppContext.Provider value={state}>
      <Container xs>
        <Text h2 css={{ textGradient: '45deg, $red600 -20%, $pink600 50%' }}>
          App with internal state passed to directly called AppContext.Provider:
        </Text>
        <ContextAgnosticParagraph1>
          <ContextAgnosticLink />
          <ContextConsumerTitle />
        </ContextAgnosticParagraph1>
        <ContextAgnosticCard>
          <ContextConsumerButton />
        </ContextAgnosticCard>
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
        <ContextAgnosticParagraph2>
          <ContextAgnosticLink />
          <ContextConsumerTitle />
        </ContextAgnosticParagraph2>
        <ContextAgnosticCard>
          <ContextConsumerButton />
        </ContextAgnosticCard>
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
