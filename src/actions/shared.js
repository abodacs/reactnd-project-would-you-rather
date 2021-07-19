import { receiveQuestions } from "./questions"
import { receiveUsers } from "./users"
import { getInitialData } from "../utils/api"

// eslint-disable-next-line import/prefer-default-export
export function handleInitialData() {
  return (dispatch) => {
    getInitialData().then(({ questions, users }) => {
      dispatch(receiveQuestions(questions))
      dispatch(receiveUsers(users))
    })
  }
}
