"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { mockJobs } from "../data/mockData"

const ApplicationSuccessPage = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [similarJobs, setSimilarJobs] = useState([])

  useEffect(() => {
    // Find job by ID
    const foundJob = mockJobs.find((j) => j.id === id)
    if (foundJob) {
      setJob(foundJob)

      // Find similar jobs
      const similar = mockJobs
        .filter((j) => j.id !== id && (j.category === foundJob.category || j.company.id === foundJob.company.id))
        .slice(0, 3)
      setSimilarJobs(similar)
    }
  }, [id])

  if (!job) {
    return (
      <div>
        <Header />
        <Container className="py-5 text-center">
          <h2>Loading...</h2>
        </Container>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />

      <main className="main-content">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-sm text-center">
                <CardBody className="p-5">
                  <div className="text-success mb-4">
                    <FontAwesomeIcon icon={faCheckCircle} size="5x" />
                  </div>
                  <h1 className="mb-3">Application Submitted!</h1>
                  <p className="lead mb-4">
                    Your application for <strong>{job.title}</strong> at <strong>{job.company.name}</strong> has been
                    successfully submitted.
                  </p>
                  <p className="text-muted mb-4">
                    We've sent a confirmation email to your inbox. The employer will review your application and contact
                    you if they're interested.
                  </p>
                  <div className="d-grid gap-2">
                    <Button color="primary" tag={Link} to="/dashboard">
                      Go to Dashboard
                    </Button>
                    <Button color="outline-primary" tag={Link} to="/jobs">
                      Browse More Jobs
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {similarJobs.length > 0 && (
            <Row className="mt-5">
              <Col xs={12} className="text-center mb-4">
                <h3>Similar Jobs You Might Like</h3>
              </Col>

              {similarJobs.map((job) => (
                <Col md={4} key={job.id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <CardBody>
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src={job.company.logo || "https://via.placeholder.com/40"}
                          alt={job.company.name}
                          className="me-3"
                          width="40"
                          height="40"
                        />
                        <div>
                          <h5 className="mb-0">{job.title}</h5>
                          <div className="text-muted small">{job.company.name}</div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center text-muted small mb-2">
                          <FontAwesomeIcon icon={faSearch} className="me-2" />
                          <span>{job.location}</span>
                        </div>
                        <div className="d-flex align-items-center text-muted small">
                          <FontAwesomeIcon icon={faSearch} className="me-2" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                      <Link
                        to={`/jobs/${job.id}`}
                        className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center"
                      >
                        View Job
                        <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default ApplicationSuccessPage

