import React, { Component } from 'react'
import './styles.css'

class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    this.props.onLogin({variables: {username: this.state.username, password: this.state.password} })
  }

  onChangeUsername = (e) => {
    this.setState({username: e.target.value})
  }

  onChangePassword = (e) => {
    this.setState({password: e.target.value})
  }

  render() {
    return (
        <form className="login__form" onSubmit={(e) => this.submitForm(e)}>
          <span className="login__username">username <input type="text" onChange={(e) => this.onChangeUsername(e)}/></span>
          <span className="login__password">password <input type="text" onChange={(e) => this.onChangePassword(e)}/></span>
          <button className="login__submit_button">Submit</button>
        </form>
    )
  }
}

export default LoginForm
