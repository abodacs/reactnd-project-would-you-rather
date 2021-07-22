import React from "react"

const AnswerOption = (props) => {
  const { option, optionPercent, authedUser, totalVotes } = props

  return (
    <>
      <li>
        {option.text}
        {authedUser && option.votes.includes(authedUser) ? (
          <span className="text-danger ml-2"> &lt;- Your choice</span>
        ) : null}
      </li>
      <div>
        <div className="bg-white rounded-lg w-72 shadow block p-4 m-auto">
          <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
            <div className="w-3/4 h-full text-center text-xs text-white bg-green-500 rounded-full">
              {`${optionPercent}%`}
            </div>
          </div>
        </div>
      </div>
      <div className="text-muted">
        chosen by {option.votes.length} out of {totalVotes} users
      </div>
    </>
  )
}

export default AnswerOption
