import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Form, Input, InputGroup, InputGroupText, Badge } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import Header from "../components/Header"
import Footer from "../components/Footer"
import JobCard from "../components/JobCard"
import CategoryCard from "../components/CategoryCard"
import { mockJobs, jobCategories } from "../data/mockData"

const HomePage = () => {
  // Get featured jobs
  const featuredJobs = mockJobs.filter((job) => job.isFeatured).slice(0, 6)

  return (
    <div>
      <Header />

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <Container>
            <Row className="justify-content-center text-center">
              <Col md={10} lg={8}>
                <h1 className="mb-3">Find Your Dream Job Today</h1>
                <p className="lead mb-5">Discover thousands of job opportunities with all the information you need.</p>

                <Form className="mb-4">
                  <Row>
                    <Col md={5} className="mb-3 mb-md-0">
                      <InputGroup>
                        <InputGroupText>
                          <FontAwesomeIcon icon={faSearch} />
                        </InputGroupText>
                        <Input placeholder="Job title or keyword" />
                      </InputGroup>
                    </Col>
                    <Col md={5} className="mb-3 mb-md-0">
                      <InputGroup>
                        <InputGroupText>
                          <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </InputGroupText>
                        <Input placeholder="Location" />
                      </InputGroup>
                    </Col>
                    <Col md={2}>
                      <Button color="primary" block>
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Form>

                <div className="d-flex flex-wrap justify-content-center">
                  <Badge color="light" className="me-2 mb-2">
                    Remote
                  </Badge>
                  <Badge color="light" className="me-2 mb-2">
                    Full-time
                  </Badge>
                  <Badge color="light" className="me-2 mb-2">
                    Part-time
                  </Badge>
                  <Badge color="light" className="me-2 mb-2">
                    Contract
                  </Badge>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Featured Jobs Section */}
        <section className="py-5">
          <Container>
            <Row className="mb-4 text-center">
              <Col>
                <h2 className="mb-3">Featured Jobs</h2>
                <p className="text-muted">Explore our handpicked selection of top job opportunities.</p>
              </Col>
            </Row>

            <Row>
              {featuredJobs.map((job) => (
                <Col md={6} lg={4} key={job.id} className="mb-4">
                  <JobCard job={job} />
                </Col>
              ))}
            </Row>

            <Row className="mt-3 text-center">
              <Col>
                <Button color="primary" tag={Link} to="/jobs" size="lg">
                  View All Jobs
                </Button>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Categories Section */}
        <section className="py-5 bg-light">
          <Container>
            <Row className="mb-4 text-center">
              <Col>
                <h2 className="mb-3">Browse by Category</h2>
                <p className="text-muted">Find the perfect job in your field of expertise.</p>
              </Col>
            </Row>

            <Row>
              {jobCategories.map((category) => (
                <Col sm={6} md={3} key={category.id} className="mb-4">
                  <CategoryCard category={category} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* For Job Seekers & Employers Section */}
        <section className="py-5">
          <Container>
            <Row>
              <Col lg={6} className="mb-5 mb-lg-0">
                <h2 className="mb-3">For Job Seekers</h2>
                <p className="text-muted mb-4">
                  Create a profile, upload your resume, and start applying to jobs today.
                </p>
                <div>
                  <Button color="primary" tag={Link} to="/register" className="me-2 mb-2">
                    Create Account
                  </Button>
                  <Button color="outline-primary" tag={Link} to="/jobs" className="mb-2">
                    Browse Jobs
                  </Button>
                </div>
              </Col>

              <Col lg={6}>
                <h2 className="mb-3">For Employers</h2>
                <p className="text-muted mb-4">Post jobs, find qualified candidates, and manage your hiring process.</p>
                <div>
                  <Button color="primary" tag={Link} to="/employer/post-job" className="me-2 mb-2">
                    Post a Job
                  </Button>
                  <Button color="outline-primary" tag={Link} to="/pricing" className="mb-2">
                    View Pricing
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage

