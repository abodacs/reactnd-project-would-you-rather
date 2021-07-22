import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { handleAddQuestion } from "../../actions/questions"

class NewQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      optionOneText: "",
      optionTwoText: "",
      toHome: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this)
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { dispatch } = this.props
    const { optionOneText, optionTwoText } = this.state
    dispatch(handleAddQuestion(optionOneText, optionTwoText))
    this.setState({
      optionOneText: "",
      optionTwoText: "",
      toHome: true,
    })
  }

  handleQuestionTextChange = (event, type) => {
    const { value } = event.target

    this.setState((state) =>
      type === "option1"
        ? { ...state, optionOneText: value }
        : { ...state, optionTwoText: value }
    )
  }

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome) {
      return <Redirect to="/dashboard" />
    }

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
            <form onSubmit={this.handleSubmit}>
              <div className="w-full space-y-6">
                <div className="w-full">
                  <div className=" relative ">
                    <input
                      type="text"
                      name="optionOneText"
                      placeholder="Enter Option One Text Here"
                      value={optionOneText}
                      onChange={(event) =>
                        this.handleQuestionTextChange(event, "option1")
                      }
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className=" relative ">
                    <input
                      type="text"
                      name="optionTwoText"
                      placeholder="Enter Option Two Text Here"
                      value={optionTwoText}
                      onChange={(event) =>
                        this.handleQuestionTextChange(event, "option2")
                      }
                    />
                  </div>
                </div>
                <div>
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      disabled={optionOneText === "" || optionTwoText === ""}
                      className="disabled:opacity-50 w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
                    >
                      Submit
                    </button>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(NewQuestion)
