import { Container, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="py-5 bg-light mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>JobPortal</h5>
            <p className="text-muted">
              Find your dream job or the perfect candidate with our comprehensive job portal.
            </p>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5>For Job Seekers</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/jobs" className="text-decoration-none text-muted">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-decoration-none text-muted">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-decoration-none text-muted">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-decoration-none text-muted">
                  Resources
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5>For Employers</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/employer/post-job" className="text-decoration-none text-muted">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/employer/dashboard" className="text-decoration-none text-muted">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-decoration-none text-muted">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-decoration-none text-muted">
                  Resources
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-decoration-none text-muted">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-decoration-none text-muted">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-decoration-none text-muted">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-decoration-none text-muted">
                  Careers
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={2}>
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/privacy" className="text-decoration-none text-muted">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-decoration-none text-muted">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-decoration-none text-muted">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

