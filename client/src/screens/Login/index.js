import React, { Component } from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import LoginForm from '../../components/LoginForm'
import Loading from '../../components/Loading'

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

class LoginScreen extends Component {

  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div>
        Welcome to the login screen
        <ApolloConsumer>
          {client => (
            <Mutation
              mutation={LOGIN_MUTATION}
              onCompleted={({ login }) => {
                localStorage.setItem('token', login)
                client.writeData({ data: { isLoggedIn: true } })
                this.props.history.push('/services')
              }}
            >
              {(login, { loading, error }) => {
                if (loading) return <Loading />
                if (error) {
                  return <p>There was an error</p>
                }

                return <LoginForm onLogin={login}></LoginForm>
              }}
            </Mutation>
          )}
        </ApolloConsumer>
      </div>
    )
  }
}

export default LoginScreen
