"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupText,
  Badge,
  Collapse,
} from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSearch,
  faMapMarkerAlt,
  faFilter,
  faTimes,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons"
import Header from "../components/Header"
import Footer from "../components/Footer"
import JobCard from "../components/JobCard"
import { mockJobs, jobCategories } from "../data/mockData"

const JobListingsPage = () => {
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [filters, setFilters] = useState({
    jobTypes: [],
    categories: [],
    experience: [],
    salary: [0, 200000],
    remote: false,
  })
  const [filteredJobs, setFilteredJobs] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Parse query params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const category = params.get("category")

    if (category) {
      setFilters((prev) => ({
        ...prev,
        categories: [category],
      }))
    }

    // Apply filters
    filterJobs()
  }, [location.search])

  // Filter jobs when filters change
  useEffect(() => {
    filterJobs()
  }, [searchTerm, locationFilter, filters])

  const filterJobs = () => {
    const filtered = mockJobs.filter((job) => {
      // Search term filter
      const matchesSearch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase())

      // Location filter
      const matchesLocation = locationFilter === "" || job.location.toLowerCase().includes(locationFilter.toLowerCase())

      // Job type filter
      const matchesJobType = filters.jobTypes.length === 0 || filters.jobTypes.includes(job.type)

      // Category filter
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(job.category)

      // Experience filter
      const matchesExperience =
        filters.experience.length === 0 || filters.experience.some((exp) => job.experience.includes(exp))

      // Salary filter
      const jobSalary = Number.parseInt(job.salary.replace(/[^0-9]/g, ""))
      const matchesSalary = jobSalary >= filters.salary[0] && jobSalary <= filters.salary[1]

      // Remote filter
      const matchesRemote = !filters.remote || job.isRemote

      return (
        matchesSearch &&
        matchesLocation &&
        matchesJobType &&
        matchesCategory &&
        matchesExperience &&
        matchesSalary &&
        matchesRemote
      )
    })

    setFilteredJobs(filtered)
  }

  const handleJobTypeChange = (type) => {
    setFilters((prev) => {
      const jobTypes = prev.jobTypes.includes(type) ? prev.jobTypes.filter((t) => t !== type) : [...prev.jobTypes, type]
      return { ...prev, jobTypes }
    })
  }

  const handleCategoryChange = (category) => {
    setFilters((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category]
      return { ...prev, categories }
    })
  }

  const handleExperienceChange = (experience) => {
    setFilters((prev) => {
      const experiences = prev.experience.includes(experience)
        ? prev.experience.filter((e) => e !== experience)
        : [...prev.experience, experience]
      return { ...prev, experience }
    })
  }

  const handleRemoteChange = (e) => {
    setFilters((prev) => ({ ...prev, remote: e.target.checked }))
  }

  const resetFilters = () => {
    setSearchTerm("")
    setLocationFilter("")
    setFilters({
      jobTypes: [],
      categories: [],
      experience: [],
      salary: [0, 200000],
      remote: false,
    })
  }

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen)

  return (
    <div>
      <Header />

      <main className="main-content">
        <section className="py-4 bg-light">
          <Container>
            <h1 className="mb-4">Find Your Dream Job</h1>

            <Form className="mb-4">
              <Row>
                <Col md={5} className="mb-3 mb-md-0">
                  <InputGroup>
                    <InputGroupText>
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroupText>
                    <Input
                      placeholder="Job title or keyword"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col md={5} className="mb-3 mb-md-0">
                  <InputGroup>
                    <InputGroupText>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </InputGroupText>
                    <Input
                      placeholder="Location"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col md={2}>
                  <Button color="primary" block>
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </section>

        <section className="py-5">
          <Container>
            <Row>
              {/* Filters - Desktop */}
              <Col lg={3} className="d-none d-lg-block">
                <Card className="mb-4 shadow-sm">
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">Filters</h5>
                      <Button color="link" className="p-0" onClick={resetFilters}>
                        Reset
                      </Button>
                    </div>

                    <div className="mb-4">
                      <h6>Job Type</h6>
                      {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
                        <FormGroup check key={type}>
                          <Label check>
                            <Input
                              type="checkbox"
                              checked={filters.jobTypes.includes(type)}
                              onChange={() => handleJobTypeChange(type)}
                            />{" "}
                            {type}
                          </Label>
                        </FormGroup>
                      ))}
                    </div>

                    <div className="mb-4">
                      <h6>Category</h6>
                      {jobCategories.slice(0, 5).map((category) => (
                        <FormGroup check key={category.id}>
                          <Label check>
                            <Input
                              type="checkbox"
                              checked={filters.categories.includes(category.name)}
                              onChange={() => handleCategoryChange(category.name)}
                            />{" "}
                            {category.name}
                          </Label>
                        </FormGroup>
                      ))}
                    </div>

                    <div className="mb-4">
                      <h6>Experience</h6>
                      {["0-1 years", "1-3 years", "3-5 years", "5+ years"].map((exp) => (
                        <FormGroup check key={exp}>
                          <Label check>
                            <Input
                              type="checkbox"
                              checked={filters.experience.includes(exp)}
                              onChange={() => handleExperienceChange(exp)}
                            />{" "}
                            {exp}
                          </Label>
                        </FormGroup>
                      ))}
                    </div>

                    <div className="mb-4">
                      <h6>Remote Only</h6>
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox" checked={filters.remote} onChange={handleRemoteChange} /> Remote Jobs
                          Only
                        </Label>
                      </FormGroup>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              {/* Mobile Filter Button */}
              <Col xs={12} className="d-lg-none mb-3">
                <Button
                  color="light"
                  block
                  onClick={toggleFilter}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>
                    <FontAwesomeIcon icon={faFilter} className="me-2" />
                    Filters
                  </span>
                  <FontAwesomeIcon icon={isFilterOpen ? faChevronUp : faChevronDown} />
                </Button>

                <Collapse isOpen={isFilterOpen}>
                  <Card className="mt-3 shadow-sm">
                    <CardBody>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Filters</h5>
                        <Button color="link" className="p-0" onClick={resetFilters}>
                          Reset
                        </Button>
                      </div>

                      <div className="mb-4">
                        <h6>Job Type</h6>
                        {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
                          <FormGroup check key={type}>
                            <Label check>
                              <Input
                                type="checkbox"
                                checked={filters.jobTypes.includes(type)}
                                onChange={() => handleJobTypeChange(type)}
                              />{" "}
                              {type}
                            </Label>
                          </FormGroup>
                        ))}
                      </div>

                      <div className="mb-4">
                        <h6>Category</h6>
                        {jobCategories.slice(0, 5).map((category) => (
                          <FormGroup check key={category.id}>
                            <Label check>
                              <Input
                                type="checkbox"
                                checked={filters.categories.includes(category.name)}
                                onChange={() => handleCategoryChange(category.name)}
                              />{" "}
                              {category.name}
                            </Label>
                          </FormGroup>
                        ))}
                      </div>

                      <div className="mb-4">
                        <h6>Experience</h6>
                        {["0-1 years", "1-3 years", "3-5 years", "5+ years"].map((exp) => (
                          <FormGroup check key={exp}>
                            <Label check>
                              <Input
                                type="checkbox"
                                checked={filters.experience.includes(exp)}
                                onChange={() => handleExperienceChange(exp)}
                              />{" "}
                              {exp}
                            </Label>
                          </FormGroup>
                        ))}
                      </div>

                      <div className="mb-4">
                        <h6>Remote Only</h6>
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" checked={filters.remote} onChange={handleRemoteChange} /> Remote Jobs
                            Only
                          </Label>
                        </FormGroup>
                      </div>
                    </CardBody>
                  </Card>
                </Collapse>
              </Col>

              {/* Job Listings */}
              <Col lg={9}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">{filteredJobs.length} Jobs Found</h5>

                  {(filters.jobTypes.length > 0 ||
                    filters.categories.length > 0 ||
                    filters.experience.length > 0 ||
                    filters.remote) && (
                    <Button color="outline-secondary" size="sm" onClick={resetFilters}>
                      Clear Filters
                      <FontAwesomeIcon icon={faTimes} className="ms-2" />
                    </Button>
                  )}
                </div>

                <div className="mb-4">
                  {filters.jobTypes.map((type) => (
                    <Badge color="secondary" className="me-2 mb-2" key={type} pill>
                      {type}{" "}
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="cursor-pointer"
                        onClick={() => handleJobTypeChange(type)}
                      />
                    </Badge>
                  ))}

                  {filters.categories.map((category) => (
                    <Badge color="secondary" className="me-2 mb-2" key={category} pill>
                      {category}{" "}
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="cursor-pointer"
                        onClick={() => handleCategoryChange(category)}
                      />
                    </Badge>
                  ))}

                  {filters.experience.map((exp) => (
                    <Badge color="secondary" className="me-2 mb-2" key={exp} pill>
                      {exp}{" "}
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="cursor-pointer"
                        onClick={() => handleExperienceChange(exp)}
                      />
                    </Badge>
                  ))}

                  {filters.remote && (
                    <Badge color="secondary" className="me-2 mb-2" pill>
                      Remote Only{" "}
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="cursor-pointer"
                        onClick={() => setFilters((prev) => ({ ...prev, remote: false }))}
                      />
                    </Badge>
                  )}
                </div>

                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
                ) : (
                  <Card className="text-center p-5 shadow-sm">
                    <CardBody>
                      <h4>No jobs found</h4>
                      <p className="text-muted">
                        Try adjusting your search or filters to find what you're looking for.
                      </p>
                      <Button color="primary" onClick={resetFilters}>
                        Reset Filters
                      </Button>
                    </CardBody>
                  </Card>
                )}
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default JobListingsPage

