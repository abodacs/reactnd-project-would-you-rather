import React, { PureComponent } from "react"

class UserStats extends PureComponent {
  render() {
    const { user } = this.props
    const { name, avatarURL, answers, questions } = user
    const totalScore = Object.keys(user.answers).length + user.questions.length

    return (
      <li className="flex flex-row">
        <div className="select-none cursor-pointer flex flex-1 items-center p-4">
          <div className="flex flex-col w-20 h-20 justify-center items-center mr-4">
            <span className="block relative">
              <img
                alt={`avatar of ${name}`}
                src={avatarURL}
                className="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </span>
          </div>
          <div className="flex-1 pl-1 mr-16">
            <div className="font-medium dark:text-white">{name}</div>
            <div className="text-gray-600 dark:text-gray-200 text-sm">
              Answered Questions: {Object.keys(answers).length}
              <br />
              Created Questions: {questions.length}
            </div>
          </div>
          <div className="text-gray-600 dark:text-gray-200 text-xs">
            Score: {totalScore}
          </div>
        </div>
      </li>
    )
  }
}

export default UserStats
