import React from "react"
import { Route, Switch } from "react-router-dom"
import Login from "../Login"
import Navbar from "../Navbar"
import NotFound from "../NotFound"
import NewQuestion from "../poll/NewQuestion"
import ProtectedRoute from "./ProtectedRoute"
import Leaderboard from "../Leaderboard"
import Dashboard from "../Dashboard"
import QuestionPage from "../poll/QuestionPage"

const PublicRoutes = () => (
  <>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Login} />
      <ProtectedRoute path="/dashboard" exact component={Dashboard} />
      <ProtectedRoute path="/add" exact component={NewQuestion} />
      <ProtectedRoute path="/questions/:id" component={QuestionPage} />
      <ProtectedRoute path="/leaderboard" component={Leaderboard} />
      <Route path="/not-found" component={NotFound} />
    </Switch>
  </>
)

export default PublicRoutes
