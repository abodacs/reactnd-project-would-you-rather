import React, { PureComponent } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { formatDate } from "../../utils/helpers"

class Question extends PureComponent {
  render() {
    const { question, author } = this.props
    const { optionOne, timestamp, id } = question
    const { name, avatarURL } = author
    return (
      <div className="shadow-lg rounded-xl w-full max-w-xs p-6 bg-white dark:bg-gray-800 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center justify-start w-full flex-grow">
            <div className="block relative">
              <img
                alt={name}
                src={avatarURL}
                className="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </div>
            <div className="flex flex-col items-start ml-4">
              <span className="dark:text-white text-gray-700">{name}</span>
              <span className="text-gray-400 font-light text-sm dark:text-gray-300">
                {formatDate(timestamp)}
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-800 dark:text-white text-lg mt-4 mb-2">
          {optionOne.text.slice(0, 50)}...?
        </p>
        <span className="block w-full rounded-md shadow-sm">
          <Link
            to={`/questions/${id}`}
            className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            View Poll
          </Link>
        </span>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id]
  const author = question ? users[question.author] : null

  return {
    authedUser,
    question,
    author,
  }
}

export default connect(mapStateToProps)(Question)
