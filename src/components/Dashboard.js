import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import QuestionsList from "./poll/QuestionsList"

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAnswered: false,
    }
    this.filterQuestions = this.filterQuestions.bind(this)
  }

  filterQuestions = (showAnswered) => {
    this.setState((state) => ({ ...state, showAnswered: showAnswered }))
  }

  render() {
    const { answeredQuestionIds, unansweredQuestionIds } = this.props

    return (
      <>
        <Tabs defaultActiveKey="unanswered" className="mb-3">
          <Tab title="unanswered">
            <QuestionsList
              idsList={unansweredQuestionIds}
              emptyListNote="Create new Polls"
            />
          </Tab>
          <Tab title="answered">
            <QuestionsList
              idsList={answeredQuestionIds}
              emptyListNote="What are you waiting for???"
            />
          </Tab>
        </Tabs>
      </>
    )
  }
}
/* Tab logic */
const style = {
  notSelected: `text-gray-800 border-b`,
  default: `py-2 px-4 inline-block focus:outline-none`,
  selected: `border-gray-300 border-t bg-white border-b-0 border-l border-r text-blue-700`,
}

function Tabs({ children }) {
  const childrenArray = React.Children.toArray(children)
  const [current, setCurrent] = React.useState(childrenArray[0].key)
  const newChildren = childrenArray.map((child) =>
    React.cloneElement(child, { selected: child?.key === current })
  )
  return (
    <nav>
      {childrenArray.map((child) => (
        <div
          role="link"
          tabIndex={0}
          onKeyDown={() => setCurrent(child?.key)}
          onClick={() => setCurrent(child?.key)}
          key={child?.key}
          className={`${style.default} ${
            current === child?.key ? style.selected : style.notSelected
          }`}
        >
          {child?.props.title}
        </div>
      ))}
      <section>{newChildren}</section>
    </nav>
  )
}
function Tab({ children, selected }) {
  return (
    <div hidden={!selected} className="mt-4">
      {children}
    </div>
  )
}

function mapStateToProps({ questions, users, authedUser }) {
  const answeredQuestionIds = Object.keys(questions)
    .filter((id) =>
      Object.prototype.hasOwnProperty.call(users[authedUser].answers, id)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

  const unansweredQuestionIds = Object.keys(questions)
    .filter(
      (id) => !Object.prototype.hasOwnProperty.call(users[authedUser].answers, id)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

  return {
    answeredQuestionIds,
    unansweredQuestionIds,
  }
}

export default connect(mapStateToProps)(Dashboard)
