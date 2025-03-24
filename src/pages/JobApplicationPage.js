"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Progress,
  FormFeedback,
} from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight, faUpload, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { mockJobs } from "../data/mockData"
import { AuthContext } from "../context/AuthContext"

const JobApplicationPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser, updateUser } = useContext(AuthContext)
  const [job, setJob] = useState(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    experience: "",
    education: "",
    availability: "",
    salary: "",
    referral: "",
    terms: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Find job by ID
    const foundJob = mockJobs.find((j) => j.id === id)
    if (foundJob) {
      setJob(foundJob)
    } else {
      navigate("/jobs")
    }

    // Pre-fill form data from user profile
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: currentUser.name || "",
        email: currentUser.email || "",
      }))
    }
  }, [id, currentUser, navigate])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files[0] }))

      // Clear error when user uploads file
      if (errors.resume) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.resume
          return newErrors
        })
      }
    }
  }

  const validateStep = (currentStep) => {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required"
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
      }

      if (!formData.resume) {
        newErrors.resume = "Resume is required"
      }
    } else if (currentStep === 2) {
      if (!formData.experience.trim()) {
        newErrors.experience = "Experience is required"
      }

      if (!formData.education.trim()) {
        newErrors.education = "Education is required"
      }
    } else if (currentStep === 3) {
      if (!formData.availability) {
        newErrors.availability = "Availability is required"
      }

      if (!formData.salary.trim()) {
        newErrors.salary = "Expected salary is required"
      }
    } else if (currentStep === 4) {
      if (!formData.terms) {
        newErrors.terms = "You must agree to the terms and conditions"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateStep(step)) {
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Create a new application object
      const newApplication = {
        id: Date.now().toString(),
        jobId: job.id,
        userId: currentUser.id,
        status: "pending",
        appliedAt: new Date().toISOString(),
        resume: "resume.pdf", // In a real app, this would be the uploaded file URL
        coverLetter: formData.coverLetter,
        answers: {
          experience: formData.experience,
          education: formData.education,
          availability: formData.availability,
          salary: formData.salary,
          referral: formData.referral,
        },
      }

      // Update user's applied jobs
      const appliedJobs = [...(currentUser.appliedJobs || []), job.id]
      updateUser({ appliedJobs })

      // Store application in localStorage
      const applications = JSON.parse(localStorage.getItem("applications") || "[]")
      applications.push(newApplication)
      localStorage.setItem("applications", JSON.stringify(applications))

      // Redirect to success page
      navigate(`/jobs/${job.id}/apply/success`)

      setLoading(false)
    }, 1500)
  }

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
          <div className="text-center mb-5">
            <h1 className="mb-2">Apply for {job.title}</h1>
            <p className="text-muted">at {job.company.name}</p>
          </div>

          <div className="application-steps mb-4">
            <div className={`step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
              <div className="step-number">{step > 1 ? <FontAwesomeIcon icon={faCheck} /> : 1}</div>
              <div className="step-label">Personal Info</div>
            </div>
            <div className={`step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
              <div className="step-number">{step > 2 ? <FontAwesomeIcon icon={faCheck} /> : 2}</div>
              <div className="step-label">Experience</div>
            </div>
            <div className={`step ${step >= 3 ? "active" : ""} ${step > 3 ? "completed" : ""}`}>
              <div className="step-number">{step > 3 ? <FontAwesomeIcon icon={faCheck} /> : 3}</div>
              <div className="step-label">Preferences</div>
            </div>
            <div className={`step ${step >= 4 ? "active" : ""} ${step > 4 ? "completed" : ""}`}>
              <div className="step-number">4</div>
              <div className="step-label">Review</div>
            </div>
          </div>

          <div className="progress-container mb-5">
            <Progress value={((step - 1) / 3) * 100} />
          </div>

          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <Card className="shadow-sm">
                <CardHeader>
                  <h4 className="mb-0">
                    {step === 1
                      ? "Personal Information"
                      : step === 2
                        ? "Experience & Education"
                        : step === 3
                          ? "Preferences"
                          : "Review & Submit"}
                  </h4>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <>
                        <FormGroup>
                          <Label for="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            invalid={!!errors.fullName}
                          />
                          <FormFeedback>{errors.fullName}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            invalid={!!errors.email}
                          />
                          <FormFeedback>{errors.email}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            invalid={!!errors.phone}
                          />
                          <FormFeedback>{errors.phone}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="resume">Resume</Label>
                          <div className="d-flex align-items-center">
                            <Input
                              id="resume"
                              name="resume"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                              className="d-none"
                              invalid={!!errors.resume}
                            />
                            <Button
                              type="button"
                              color="outline-primary"
                              onClick={() => document.getElementById("resume").click()}
                              className="me-2"
                            >
                              <FontAwesomeIcon icon={faUpload} className="me-2" />
                              {formData.resume ? "Change Resume" : "Upload Resume"}
                            </Button>
                            {formData.resume && (
                              <Button
                                type="button"
                                color="link"
                                className="p-0 text-danger"
                                onClick={() => setFormData((prev) => ({ ...prev, resume: null }))}
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </Button>
                            )}
                          </div>
                          {formData.resume && <div className="text-muted small mt-1">{formData.resume.name}</div>}
                          {errors.resume && <div className="text-danger small mt-1">{errors.resume}</div>}
                        </FormGroup>

                        <FormGroup>
                          <Label for="coverLetter">Cover Letter (Optional)</Label>
                          <Input
                            id="coverLetter"
                            name="coverLetter"
                            type="textarea"
                            rows="5"
                            placeholder="Tell us why you're a good fit for this position"
                            value={formData.coverLetter}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <FormGroup>
                          <Label for="experience">Work Experience</Label>
                          <Input
                            id="experience"
                            name="experience"
                            type="textarea"
                            rows="5"
                            placeholder="Describe your relevant work experience"
                            value={formData.experience}
                            onChange={handleChange}
                            invalid={!!errors.experience}
                          />
                          <FormFeedback>{errors.experience}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="education">Education</Label>
                          <Input
                            id="education"
                            name="education"
                            type="textarea"
                            rows="5"
                            placeholder="Describe your educational background"
                            value={formData.education}
                            onChange={handleChange}
                            invalid={!!errors.education}
                          />
                          <FormFeedback>{errors.education}</FormFeedback>
                        </FormGroup>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <FormGroup tag="fieldset">
                          <Label>When can you start?</Label>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="radio"
                                name="availability"
                                value="immediately"
                                checked={formData.availability === "immediately"}
                                onChange={handleChange}
                              />{" "}
                              Immediately
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="radio"
                                name="availability"
                                value="two-weeks"
                                checked={formData.availability === "two-weeks"}
                                onChange={handleChange}
                              />{" "}
                              2 weeks notice
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="radio"
                                name="availability"
                                value="one-month"
                                checked={formData.availability === "one-month"}
                                onChange={handleChange}
                              />{" "}
                              1 month notice
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="radio"
                                name="availability"
                                value="other"
                                checked={formData.availability === "other"}
                                onChange={handleChange}
                              />{" "}
                              Other
                            </Label>
                          </FormGroup>
                          {errors.availability && <div className="text-danger small mt-1">{errors.availability}</div>}
                        </FormGroup>

                        <FormGroup>
                          <Label for="salary">Expected Salary</Label>
                          <Input
                            id="salary"
                            name="salary"
                            placeholder="e.g. $80,000"
                            value={formData.salary}
                            onChange={handleChange}
                            invalid={!!errors.salary}
                          />
                          <FormFeedback>{errors.salary}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="referral">How did you hear about this job?</Label>
                          <Input
                            id="referral"
                            name="referral"
                            placeholder="e.g. LinkedIn, Job Board, Referral"
                            value={formData.referral}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <div className="mb-4">
                          <h5 className="mb-3">Personal Information</h5>
                          <Card className="bg-light">
                            <CardBody>
                              <Row>
                                <Col md={6} className="mb-3">
                                  <div className="fw-bold">Full Name</div>
                                  <div>{formData.fullName}</div>
                                </Col>
                                <Col md={6} className="mb-3">
                                  <div className="fw-bold">Email</div>
                                  <div>{formData.email}</div>
                                </Col>
                                <Col md={6} className="mb-3">
                                  <div className="fw-bold">Phone</div>
                                  <div>{formData.phone}</div>
                                </Col>
                                <Col md={6} className="mb-3">
                                  <div className="fw-bold">Resume</div>
                                  <div>{formData.resume ? formData.resume.name : "No resume uploaded"}</div>
                                </Col>
                              </Row>
                              {formData.coverLetter && (
                                <div>
                                  <div className="fw-bold">Cover Letter</div>
                                  <div>{formData.coverLetter}</div>
                                </div>
                              )}
                            </CardBody>
                          </Card>
                        </div>

                        <div className="mb-4">
                          <h5 className="mb-3">Experience & Education</h5>
                          <Card className="bg-light">
                            <CardBody>
                              <div className="mb-3">
                                <div className="fw-bold">Work Experience</div>
                                <div>{formData.experience}</div>
                              </div>
                              <div>
                                <div className="fw-bold">Education</div>
                                <div>{formData.education}</div>
                              </div>
                            </CardBody>
                          </Card>
                        </div>

                        <div className="mb-4">
                          <h5 className="mb-3">Preferences</h5>
                          <Card className="bg-light">
                            <CardBody>
                              <Row>
                                <Col md={6} className="mb-3">
                                  <div className="fw-bold">Availability</div>
                                  <div>{formData.availability}</div>
                                </Col>
                                <Col md={6} className="mb-3">
                                  <div className="fw-bold">Expected Salary</div>
                                  <div>{formData.salary}</div>
                                </Col>
                                {formData.referral && (
                                  <Col md={12}>
                                    <div className="fw-bold">Referral Source</div>
                                    <div>{formData.referral}</div>
                                  </Col>
                                )}
                              </Row>
                            </CardBody>
                          </Card>
                        </div>

                        <FormGroup check className="mb-4">
                          <Label check>
                            <Input
                              type="checkbox"
                              name="terms"
                              checked={formData.terms}
                              onChange={handleChange}
                              invalid={!!errors.terms}
                            />{" "}
                            I agree to the terms and conditions
                          </Label>
                          <div className="text-muted small mt-1">
                            By submitting this application, I certify that all information provided is true and
                            complete.
                          </div>
                          {errors.terms && <div className="text-danger small mt-1">{errors.terms}</div>}
                        </FormGroup>
                      </>
                    )}

                    <div className="d-flex justify-content-between mt-4">
                      {step > 1 ? (
                        <Button type="button" color="outline-primary" onClick={prevStep}>
                          <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
                          Back
                        </Button>
                      ) : (
                        <div></div>
                      )}

                      {step < 4 ? (
                        <Button type="button" color="primary" onClick={nextStep}>
                          Next
                          <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
                        </Button>
                      ) : (
                        <Button type="submit" color="primary" disabled={loading}>
                          {loading ? "Submitting..." : "Submit Application"}
                        </Button>
                      )}
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default JobApplicationPage

