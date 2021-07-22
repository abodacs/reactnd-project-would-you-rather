import React, { PureComponent, Fragment } from "react"
import { connect } from "react-redux"
import UnAnswerPanel from "./UnAnswerPanel"
import AnswerPanel from "./AnswerPanel"

class QuestionPage extends PureComponent {
  render() {
    const { autherUserAnsweres, match } = this.props
    const { id } = match.params
    const answered = !!Object.prototype.hasOwnProperty.call(autherUserAnsweres, id)

    return <>{answered ? <AnswerPanel id={id} /> : <UnAnswerPanel id={id} />}</>
  }
}

function mapStateToProps({ authedUser, users }) {
  const autherUserAnsweres = users[authedUser].answers

  return {
    autherUserAnsweres,
    authedUser,
  }
}

export default connect(mapStateToProps)(QuestionPage)
