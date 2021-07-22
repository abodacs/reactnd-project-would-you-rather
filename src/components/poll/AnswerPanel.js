import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { formatDate } from "../../utils/helpers"
import AnswerOption from "./AnswerOption"

class AnswerPanel extends PureComponent {
  render() {
    const { question, author, authedUser } = this.props

    if (question === null) {
      return <Redirect to="/not-found" />
    }
    const { name, avatarURL } = author

    const { optionOne, optionTwo, timestamp } = question
    const totalOptionOneVotes = optionOne.votes.length
    const totalOptionTwoVotes = optionTwo.votes.length
    const totalVotes = totalOptionOneVotes + totalOptionTwoVotes
    const optionOnePercent = Math.round((totalOptionOneVotes / totalVotes) * 100)
    const optionTwoPercent = Math.round((totalOptionTwoVotes / totalVotes) * 100)

    return (
      <div className="rounded-lg shadow-lg overflow-hidden mb-4">
        <div className="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6">
          <div className="flex justify-center">
            <span className="block relative">
              <img
                alt={`avatar of ${name}`}
                src={avatarURL}
                className="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </span>
            <div className="flex flex-col items-center ml-2">
              <span className="dark:text-white">{author.name} asks:</span>
              <span className="text-gray-400 text-sm dark:text-gray-300">
                {formatDate(timestamp)}
              </span>
              <div className="flex items-center justify-between my-2">
                <ul>
                  <AnswerOption
                    option={optionOne}
                    optionPercent={optionOnePercent}
                    authedUser={authedUser}
                    totalVotes={totalVotes}
                  />
                  <AnswerOption
                    option={optionTwo}
                    optionPercent={optionTwoPercent}
                    authedUser={authedUser}
                    totalVotes={totalVotes}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
  const question = questions[id]

  return {
    question: question || null,
    author: question ? users[question.author] : null,
    authedUser,
  }
}

export default connect(mapStateToProps)(AnswerPanel)
