import React, { PureComponent } from "react"
import { connect } from "react-redux"
import UserStats from "./UserStats"

class Leaderboard extends PureComponent {
  render() {
    const { users } = this.props
    const sortedUsers = users.sort((a, b) => b.totalScore - a.totalScore)

    return (
      <>
        <div className="container flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
          <ul className="flex flex-col divide divide-y">
            {sortedUsers.map((user) => (
              <UserStats key={user.id} id={user.id} user={user} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

function mapStateToProps({ users }) {
  const usersList = Object.values(users)
  usersList.map((user) => ({
    ...user,
    totalScore: Object.keys(user.answers).length + user.questions.length,
  }))
  return {
    users: usersList,
  }
}

export default connect(mapStateToProps)(Leaderboard)
