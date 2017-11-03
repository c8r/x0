import React from 'react'

const URL = 'https://api.graph.cool/simple/v1/cj90efsm60hka01721jcnbn53'

import { request } from 'graphql-request'

import { ThemeProvider } from 'glamorous'
import theme from './theme'

import {
  H1,
  Flex,
  Font,
  Profile,
  Container
} from './components'

const App = props =>
  <ThemeProvider theme={theme}>
    <Font>
      <Container>
        <H1 mb={5}>Compositor Team</H1>

        <Flex
          children={props.team.map(t =>
            <Profile
              avatar={t.avatarUrl}
              name={t.name}
              location={t.location}
            />
          )}
        />
      </Container>
    </Font>
  </ThemeProvider>

App.getInitialProps = async () => {
  const query = `{
    allTeamMembers {
      avatarUrl
      location
      name
    }
  }`

  const { allTeamMembers } = await request(URL, query)

  return { team: allTeamMembers }
}

export default App
