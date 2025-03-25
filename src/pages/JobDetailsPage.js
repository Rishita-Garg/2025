"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

// Reactstrap Components
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Badge,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMapMarkerAlt,
  faDollarSign,
  faBriefcase,
  faGraduationCap,
  faBuilding,
  faGlobe,
  faUsers,
  faCalendar,
  faBookmark,
  faCheck,
  faShare,
} from "@fortawesome/free-solid-svg-icons"


import Header from "../components/Header"
import Footer from "../components/Footer"
import { mockJobs } from "../data/mockData"
import { AuthContext } from "../context/AuthContext"

const JobDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser, updateUser } = useContext(AuthContext)
  const [job, setJob] = useState(null)
  const [activeTab, setActiveTab] = useState("1")
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Find job by ID
    const foundJob = mockJobs.find((j) => j.id === id)
    if (foundJob) {
      setJob(foundJob)
    }

    // Check if job is saved
    if (currentUser && currentUser.savedJobs) {
      setIsSaved(currentUser.savedJobs.includes(id))
    }
  }, [id, currentUser])

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  const handleSaveJob = () => {
    if (!currentUser) {
      navigate("/login")
      return
    }

    const savedJobs = [...(currentUser.savedJobs || [])]

    if (isSaved) {
      // Remove job from saved jobs
      const updatedSavedJobs = savedJobs.filter((jobId) => jobId !== id)
      updateUser({ savedJobs: updatedSavedJobs })
    } else {
      // Add job to saved jobs
      savedJobs.push(id)
      updateUser({ savedJobs })
    }

    setIsSaved(!isSaved)
  }

  const handleApply = () => {
    if (!currentUser) {
      navigate("/login")
      return
    }

    navigate(`/jobs/${id}/apply`)
  }

  if (!job) {
    return (
      <div>
        <Header />
        <Container className="py-5 text-center">
          <h2>Job not found</h2>
          <p>The job you are looking for does not exist.</p>
          <Button color="primary" tag={Link} to="/jobs">
            Browse Jobs
          </Button>
        </Container>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />

      <main className="main-content">
        <section className="py-4 bg-light">
          <Container>
            <Row>
              <Col lg={8}>
                <div className="d-flex align-items-center mb-4">
                  <img
                    src={job.company.logo || "https://via.placeholder.com/60"}
                    alt={job.company.name}
                    className="company-logo me-3"
                  />
                  <div>
                    <h1 className="h3 mb-1">{job.title}</h1>
                    <div className="text-muted">
                      <Link to={`/companies/${job.company.id}`} className="text-decoration-none">
                        {job.company.name}
                      </Link>
                      <span className="mx-2">•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap mb-4">
                  <Badge color={job.type === "Full-time" ? "primary" : "secondary"} className="me-2 mb-2">
                    {job.type}
                  </Badge>
                  {job.isRemote && (
                    <Badge color="info" className="me-2 mb-2">
                      Remote
                    </Badge>
                  )}
                  <Badge color="light" className="me-2 mb-2">
                    {job.category}
                  </Badge>
                </div>

                <Row className="mb-4">
                  <Col sm={6} md={3} className="mb-3">
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-muted me-2" />
                      <span>{job.location}</span>
                    </div>
                  </Col>
                  <Col sm={6} md={3} className="mb-3">
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faDollarSign} className="text-muted me-2" />
                      <span>{job.salary}</span>
                    </div>
                  </Col>
                  <Col sm={6} md={3} className="mb-3">
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faBriefcase} className="text-muted me-2" />
                      <span>{job.experience}</span>
                    </div>
                  </Col>
                  <Col sm={6} md={3} className="mb-3">
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faGraduationCap} className="text-muted me-2" />
                      <span>{job.education}</span>
                    </div>
                  </Col>
                </Row>

                <div className="d-flex flex-wrap mb-4">
                  <Button color="primary" className="me-2 mb-2" onClick={handleApply}>
                    <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                    Apply Now
                  </Button>
                  <Button color={isSaved ? "success" : "outline-primary"} className="me-2 mb-2" onClick={handleSaveJob}>
                    <FontAwesomeIcon icon={isSaved ? faCheck : faBookmark} className="me-2" />
                    {isSaved ? "Saved" : "Save Job"}
                  </Button>
                  <Button color="outline-secondary" className="mb-2">
                    <FontAwesomeIcon icon={faShare} className="me-2" />
                    Share
                  </Button>
                </div>
              </Col>

              <Col lg={4}>
                <Card className="shadow-sm">
                  <CardBody>
                    <h5 className="mb-3">Company Information</h5>
                    <hr />
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={job.company.logo || "https://via.placeholder.com/60"}
                        alt={job.company.name}
                        className="company-logo me-3"
                      />
                      <div>
                        <h6 className="mb-1">{job.company.name}</h6>
                        <div className="text-muted small">{job.company.industry}</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <FontAwesomeIcon icon={faBuilding} className="text-muted me-2" />
                        <span>{job.company.location}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <FontAwesomeIcon icon={faGlobe} className="text-muted me-2" />
                        <a
                          href={job.company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                        >
                          {job.company.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <FontAwesomeIcon icon={faUsers} className="text-muted me-2" />
                        <span>{job.company.employees} employees</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faCalendar} className="text-muted me-2" />
                        <span>Founded {job.company.founded}</span>
                      </div>
                    </div>

                    <Button color="outline-primary" block tag={Link} to={`/companies/${job.company.id}`}>
                      View Company Profile
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="py-5">
          <Container>
            <Card className="shadow-sm">
              <CardBody>
                <Nav tabs className="mb-4">
                  <NavItem>
                    <NavLink className={activeTab === "1" ? "active" : ""} onClick={() => toggle("1")}>
                      Description
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={activeTab === "2" ? "active" : ""} onClick={() => toggle("2")}>
                      Requirements
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={activeTab === "3" ? "active" : ""} onClick={() => toggle("3")}>
                      Responsibilities
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={activeTab === "4" ? "active" : ""} onClick={() => toggle("4")}>
                      Benefits
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <h5 className="mb-3">Job Description</h5>
                    <p>{job.description}</p>
                    <h6 className="mt-4 mb-3">Required Skills</h6>
                    <div className="d-flex flex-wrap">
                      {job.skills.map((skill, index) => (
                        <Badge color="light" key={index} className="me-2 mb-2">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <h5 className="mb-3">Requirements</h5>
                    <ul className="ps-3">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="mb-2">
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </TabPane>
                  <TabPane tabId="3">
                    <h5 className="mb-3">Responsibilities</h5>
                    <ul className="ps-3">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index} className="mb-2">
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </TabPane>
                  <TabPane tabId="4">
                    <h5 className="mb-3">Benefits</h5>
                    <ul className="ps-3">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="mb-2">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>

            <div className="text-center mt-4">
              <Button color="primary" size="lg" onClick={handleApply}>
                <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                Apply Now
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default JobDetailsPage

