import { Link } from "react-router-dom"
import { Card, CardBody, CardTitle, CardSubtitle, Badge, Button, Row, Col } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faDollarSign, faBriefcase, faClock,faBuilding } from "@fortawesome/free-solid-svg-icons"

const JobCard = ({ job }) => {
  return (
    <Card className="job-card shadow-sm">
      <CardBody>
        <Row>
          <Col xs="12" md="8">
            <div className="d-flex align-items-center mb-3">
            <FontAwesomeIcon
  icon={faBuilding}
  className="fs-2 text-light me-3"
  style={{ backgroundColor: "black", padding: "5px", borderRadius: "5px" }}
/>


              <div>
                <CardTitle tag="h5" className="mb-1">
                  {job.title}
                </CardTitle>
                <CardSubtitle tag="h6" className="text-muted">
                  {job.company.name}
                </CardSubtitle>
              </div>
            </div>
            <div className="d-flex flex-wrap mb-3">
              <div className="me-3 mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-muted me-1" />
                <small>{job.location}</small>
              </div>
              <div className="me-3 mb-2">
                <FontAwesomeIcon icon={faDollarSign} className="text-muted me-1" />
                <small>{job.salary}</small>
              </div>
              <div className="me-3 mb-2">
                <FontAwesomeIcon icon={faBriefcase} className="text-muted me-1" />
                <small>{job.experience}</small>
              </div>
              <div className="mb-2">
                <FontAwesomeIcon icon={faClock} className="text-muted me-1" />
                <small>Posted {job.postedAt}</small>
              </div>
            </div>
          </Col>
          <Col xs="12" md="4" className="d-flex flex-column justify-content-between align-items-md-end">
            <div className="mb-3 mb-md-0">
              <Badge color={job.type === "Full-time" ? "primary" : "secondary"} className="me-2">
                {job.type}
              </Badge>
              {job.isRemote && <Badge color="info">Remote</Badge>}
            </div>
            <div className="d-flex flex-column flex-sm-row">
              <Button color="primary" outline tag={Link} to={`/jobs/${job.id}`} className="me-0 me-sm-2 mb-2 mb-sm-0">
                View Details
              </Button>
              <Button color="primary" tag={Link} to={`/jobs/${job.id}/apply`}>
                Apply Now
              </Button>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default JobCard

