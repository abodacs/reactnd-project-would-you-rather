import React from "react"
import Question from "./Question"

function QuestionsList(props) {
  const { idsList, emptyListNote } = props

  return (
    <>
      {idsList.length ? (
        idsList.map((id) => <Question key={id} id={id} />)
      ) : (
        <p className="text-center">{emptyListNote}</p>
      )}
    </>
  )
}

export default QuestionsList
