import React, { PureComponent } from "react"
import { NavLink, Link } from "react-router-dom"

class Navbar extends PureComponent {
  render() {
    return (
      <nav className="nav flex flex-wrap items-center justify-between px-4">
        <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
          <li className="border-t md:border-none">
            <NavLink
              to="/dashboard"
              exact
              activeClassName="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker font-bold"
            >
              Home
            </NavLink>
            <NavLink
              to="/add"
              exact
              activeClassName="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker font-bold"
            >
              New Question
            </NavLink>
            <NavLink
              to="/leaderboard"
              exact
              activeClassName="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker font-bold"
            >
              Leaderboard
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar
