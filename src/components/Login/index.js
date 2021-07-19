import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect, withRouter } from "react-router-dom"
import { setAuthedUser, resetAuthedUser } from "../../actions/authedUser"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { userId: null, toHome: false }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(resetAuthedUser())
  }

  handleLogin = (e) => {
    e.preventDefault()
    const { userId } = this.state
    const { dispatch } = this.props

    dispatch(setAuthedUser(userId))

    this.setState((previousState) => ({
      ...previousState,
      toHome: true,
    }))
  }

  handleUserSelectionChanged = (e) => {
    e.preventDefault()
    const userId = e.target.value
    this.setState((previousState) => ({
      ...previousState,
      userId,
    }))
  }

  render() {
    const { userId, toHome } = this.state
    const { users, location } = this.props
    const { from } = location.state || {
      from: { pathname: "/dashboard" },
    }
    const selected = userId || -1
    if (toHome) {
      return <Redirect to={from} />
    }
    return (
      <div className="container mx-auto p-8 flex">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl text-center mb-12 font-thin">
            Welcome To Would You Rather App
          </h1>

          <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <div className="p-8">
              <form onSubmit={this.handleLogin}>
                <label className="block" htmlFor="select1">
                  <span className="text-gray-700">Username</span>
                  <select
                    className="block w-full mt-1"
                    defaultValue={selected}
                    value={selected}
                    onChange={(event) => this.handleUserSelectionChanged(event)}
                  >
                    <option value="-1" disabled>
                      Select user...
                    </option>
                    {Object.keys(users).map((key) => (
                      <option value={users[key].id} key={key}>
                        {users[key].name}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  disabled={userId === null}
                  className="disabled:opacity-50 w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  }
}

export default withRouter(connect(mapStateToProps)(Login))
