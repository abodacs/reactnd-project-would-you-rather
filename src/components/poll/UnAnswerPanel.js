/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { handleAddAnswer } from "../../actions/questions"
import { formatDate } from "../../utils/helpers"

class UnAnswerPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMsg: "",
    }
    this.handleSaveAnswer = this.handleSaveAnswer.bind(this)
  }

  handleSaveAnswer = (id, e) => {
    e.preventDefault()
    const answer = this.form.answer.value
    const { dispatch, authedUser } = this.props

    if (answer !== "") {
      dispatch(
        handleAddAnswer({
          qid: id,
          authedUser,
          answer: answer,
        })
      )
    } else {
      this.setState({ errorMsg: "You must make a choice" })
    }
  }

  render() {
    const { question, author } = this.props
    if (question === null) {
      return <Redirect to="/not-found" />
    }
    const { errorMsg } = this.state
    const { optionOne, optionTwo, timestamp, id } = question
    const { name, avatarURL } = author

    return (
      <div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
        <div className="px-4 py-8 sm:px-10">
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm leading-5">
              <span className="px-2 text-gray-500 bg-white">Would You Rather</span>
            </div>
          </div>
          <div className="mt-6">
            <form
              onSubmit={(e) => this.handleSaveAnswer(id, e)}
              // eslint-disable-next-line no-return-assign
              ref={(f) => (this.form = f)}
            >
              {errorMsg ? <p className="text-danger">{errorMsg}</p> : null}

              <div className="flex items-center gap-8">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="optionOne"
                    label={optionOne.text}
                    value="optionOne"
                    name="answer"
                    className="h-5 w-5 text-red-600"
                  />
                  <span className="ml-2 text-gray-700">{optionOne.text}</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="optionTwo"
                    label={optionTwo.text}
                    value="optionTwo"
                    name="answer"
                    className="h-5 w-5 text-red-600"
                  />
                  <span className="ml-2 text-gray-700">{optionTwo.text}</span>
                </label>
              </div>
              <button
                type="submit"
                className="disabled:opacity-50 w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
              >
                Vote
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: question || null,
    author: question ? users[question.author] : null,
  }
}

export default connect(mapStateToProps)(UnAnswerPanel)
