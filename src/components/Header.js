"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Collapse,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faUser, faBell, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from "../context/AuthContext"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { currentUser, isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const toggle = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <Navbar color="light" light expand="md" className="mb-4">
      <div className="container">
        <NavbarBrand tag={Link} to="/">
          <FontAwesomeIcon icon={faBriefcase} className="me-2" />
          JobPortal
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/jobs">
                Find Jobs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/companies">
                Companies
              </NavLink>
            </NavItem>
            {isAuthenticated && currentUser.role === "employer" && (
              <NavItem>
                <NavLink tag={Link} to="/employer/post-job">
                  Post a Job
                </NavLink>
              </NavItem>
            )}
          </Nav>
          <Nav navbar>
            {isAuthenticated ? (
              <>
                <NavItem className="d-none d-md-block me-2">
                  <Button
                    color="light"
                    tag={Link}
                    to={currentUser.role === "jobseeker" ? "/dashboard" : "/employer/dashboard"}
                  >
                    Dashboard
                  </Button>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <FontAwesomeIcon icon={faUser} className="me-1" />
                    {currentUser.name}
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem
                      tag={Link}
                      to={currentUser.role === "jobseeker" ? "/dashboard" : "/employer/dashboard"}
                    >
                      Dashboard
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/profile">
                      Profile
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <Button color="link">
                    <FontAwesomeIcon icon={faBell} />
                  </Button>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className="me-2">
                  <Button color="outline-primary" tag={Link} to="/login">
                    Login
                  </Button>
                </NavItem>
                <NavItem>
                  <Button color="primary" tag={Link} to="/register">
                    Register
                  </Button>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  )
}

export default Header

