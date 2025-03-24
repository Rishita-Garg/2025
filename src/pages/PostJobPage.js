import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FormFeedback
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faPlus, 
  faMinus 
} from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { jobCategories } from '../data/mockData';

const PostJobPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: 'Full-time',
    location: '',
    isRemote: false,
    salary: '',
    description: '',
    requirements: [''],
    responsibilities: [''],
    benefits: [''],
    experience: '',
    education: '',
    skills: [''],
    deadline: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleArrayChange = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };
  
  const addArrayItem = (field) => {
    setFormData(prev => {
      const newArray = [...prev[field], ''];
      return { ...prev, [field]: newArray };
    });
  };
  
  const removeArrayItem = (field, index) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };
  
  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.title.trim()) {
        newErrors.title = 'Job title is required';
      }
      
      if (!formData.category) {
        newErrors.category = 'Category is required';
      }
      
      if (!formData.location.trim() && !formData.isRemote) {
        newErrors.location = 'Location is required for non-remote jobs';
      }
      
      if (!formData.salary.trim()) {
        newErrors.salary = 'Salary information is required';
      }
    } else if (currentStep === 2) {
      if (!formData.description.trim()) {
        newErrors.description = 'Job description is required';
      }
      
      if (formData.requirements.some(req => !req.trim())) {
        newErrors.requirements = 'All requirements must be filled';
      }
      
      if (formData.responsibilities.some(resp => !resp.trim())) {
        newErrors.responsibilities = 'All responsibilities must be filled';
      }
    } else if (currentStep === 3) {
      if (!formData.experience.trim()) {
        newErrors.experience = 'Experience requirement is required';
      }
      
      if (!formData.education.trim()) {
        newErrors.education = 'Education requirement is required';
      }
      
      if (formData.skills.some(skill => !skill.trim())) {
        newErrors.skills = 'All skills must be filled';
      }
      
      if (!formData.deadline.trim()) {
        newErrors.deadline = 'Application deadline is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateStep(step)) {
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create a new job object
      const newJob = {
        id: Date.now().toString(),
        ...formData,
        company: currentUser?.company,
        postedAt: new Date().toLocaleDateString(),
        isFeatured: false,
      };
      
      // Store job in localStorage
      const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      jobs.push(newJob);
      localStorage.setItem('jobs', JSON.stringify(jobs));
      
      // Redirect to employer dashboard
      navigate('/employer/dashboard');
      
      setLoading(false);
    }, 1500);
  };
  
  return (
    <div>
      <Header />
      
      <main className="main-content">
        <Container className="py-5">
          <div className="mb-4">
            <Button color="link" className="text-decoration-none" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
              Back to Dashboard
            </Button>
          </div>
          
          <div className="text-center mb-5">
            <h1 className="mb-2">Post a New Job</h1>
            <p className="text-muted">Create a job listing to find the perfect candidate</p>
          </div>
          
          <div className="application-steps mb-4">
            <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <div className="step-number">
                {step > 1 ? <FontAwesomeIcon icon={faChevronRight} /> : 1}
              </div>
              <div className="step-label">Basic Info</div>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <div className="step-number">
                {step > 2 ? <FontAwesomeIcon icon={faChevronRight} /> : 2}
              </div>
              <div className="step-label">Description</div>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-label">Requirements</div>
            </div>
          </div>
          
          <div className="progress-container mb-5">
            <Progress value={((step - 1) / 2) * 100} />
          </div>
          
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <Card className="shadow-sm">
                <CardHeader>
                  <h4 className="mb-0">
                    {step === 1
                      ? "Basic Information"
                      : step === 2
                      ? "Job Description"
                      : "Requirements & Qualifications"}
                  </h4>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <>
                        <FormGroup>
                          <Label for="title">Job Title</Label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="e.g. Senior Frontend Developer"
                            value={formData.title}
                            onChange={handleChange}
                            invalid={!!errors.title}
                          />
                          <FormFeedback>{errors.title}</FormFeedback>
                        </FormGroup>
                        
                        <FormGroup>
                          <Label for="category">Category</Label>
                          <Input
                            id="category"
                            name="category"
                            type="select"
                            value={formData.category}
                            onChange={handleChange}
                            invalid={!!errors.category}
                          >
                            <option value="">Select a category</option>
                            {jobCategories.map(category => (
                              <option key={category.id} value={category.name}>
                                {category.name}
                              </option>
                            ))}
                          </Input>
                          <FormFeedback>{errors.category}</FormFeedback>
                        </FormGroup>
                        
                        <FormGroup tag="fieldset">
                          <Label>Job Type</Label>
                          <div className="d-flex flex-wrap">
                            <FormGroup check className="me-4">
                              <Label check>
                                <Input
                                  type="radio"
                                  name="type"
                                  value="Full-time"
                                  checked={formData.type === 'Full-time'}
                                  onChange={handleChange}
                                />{' '}
                                Full-time
                              </Label>
                            </FormGroup>
                            <FormGroup check className="me-4">
                              <Label check>
                                <Input
                                  type="radio"
                                  name="type"
                                  value="Part-time"
                                  checked={formData.type === 'Part-time'}
                                  onChange={handleChange}
                                />{' '}
                                Part-time
                              </Label>
                            </FormGroup>
                            <FormGroup check className="me-4">
                              <Label check>
                                <Input
                                  type="radio"
                                  name="type"
                                  value="Contract"
                                  checked={formData.type === 'Contract'}
                                  onChange={handleChange}
                                />{' '}
                                Contract
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  type="radio"
                                  name="type"
                                  value="Remote"
                                  checked={formData.type === 'Remote'}
                                  onChange={handleChange}
                                />{' '}
                                Remote
                              </Label>
                            </FormGroup>
                          </div>
                        </FormGroup>
                        
                        <FormGroup check className="mb-3">
                          <Label check>
                            <Input
                              type="checkbox"
                              name="isRemote"
                              checked={formData.isRemote}
                              onChange={handleChange}
                            />{' '}
                            This is a remote position
                          </Label>
                        </FormGroup>
                        
                        <FormGroup>
                          <Label for="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            placeholder="e.g. San Francisco, CA"
                            value={formData.location}
                            onChange={handleChange}
                            disabled={formData.isRemote}
                            invalid={!!errors.location}
                          />
                          <FormFeedback>{errors.location}</FormFeedback>
                        </FormGroup>
                        
                        <FormGroup>
                          <Label for="salary">Salary Range</Label>
                          <Input
                            id="salary"
                            name="salary"
                            placeholder="e.g. $80,000 - $100,000"
                            value={formData.salary}
                            onChange={handleChange}
                            invalid={!!errors.salary}
                          />
                          <FormFeedback>{errors.salary}</FormFeedback>
                        </FormGroup>
                      </>
                    )}
                    
                    {step === 2 && (
                      <>
                        <FormGroup>
                          <Label for="description">Job Description</Label>
                          <Input
                            id="description"
                            name="description"
                            type="textarea"
                            rows="5"
                            placeholder="Describe the job role and responsibilities"
                            value={formData.description}
                            onChange={handleChange}
                            invalid={!!errors.description}
                          />
                          <FormFeedback>{errors.description}</FormFeedback>
                        </FormGroup>
                        
                        <FormGroup>
                          <Label>Requirements</Label>
                          {formData.requirements.map((requirement, index) => (
                            <div key={index} className="d-flex mb-2">
                              <Input
                                placeholder={`Requirement ${index + 1}`}
                                value={requirement}
                                onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                                invalid={errors.requirements && !requirement.trim()}
                              />
                              {formData.requirements.length > 1 && (
                                <Button
                                  type="button"
                                  color="link"
                                  className="text-danger ms-2"
                                  onClick={() => removeArrayItem('requirements', index)}
                                >
                                  <FontAwesomeIcon icon={faMinus} />
                                </Button>
                              )}
                            </div>
                          ))}
                          {errors.requirements && (
                            <div className="text-danger small mb-2">{errors.requirements}</div>
                          )}
                          <Button
                            type="button"
                            color="outline-primary"
                            size="sm"
                            onClick={() => addArrayItem('requirements')}
                          >
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Add Requirement
                          </Button>
                        </FormGroup>
                        
                        <FormGroup>
                        <Label>Responsibilities</Label>
{formData.responsibilities.map((responsibility, index) => (
  <div key={index} className="d-flex mb-2">
    <Input
      placeholder={`Responsibility ${index + 1}`}
      value={responsibility}
      onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
      invalid={errors.responsibilities && !responsibility.trim()}
    />


                              {formData.responsibilities.length > 1 && (
                                <Button
                                  type="button"
                                  color="link"
                                  className="text-danger ms-2"
                                  onClick={() => removeArrayItem('responsibilities', index)}
                                >
                                  <FontAwesomeIcon icon={faMinus} />
                                </Button>
                              )}
                            </div>
                          ))}
                          {errors.responsibilities && (
                            <div className="text-danger small mb-2">{errors.responsibilities}</div>
                          )}
                          <Button
                            type="button"
                            color="outline-primary"
                            size="sm"
                            onClick={() => addArrayItem('responsibilities')}
                          >
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Add Responsibility
                          </Button>
                        </FormGroup>
                        
                        <FormGroup>
                          <Label>Benefits</Label>
                          {formData.benefits.map((benefit, index) => (
                            <div key={index} className="d-flex mb-2">
                              <Input
                                placeholder={`Benefit ${index + 1}`}
                                value={benefit}
                                onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                              />
                              {formData.benefits.length > 1 && (
                                <Button
                                  type="button"
                                  color="link"
                                  className="text-danger ms-2"
                                  onClick={() => removeArrayItem('benefits', index)}
                                >
                                  <FontAwesomeIcon icon={faMinus} />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            type="button"
                            color="outline-primary"
                            size="sm"
                            onClick={() => addArrayItem('benefits')}
                          >
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Add Benefit
                          </Button>
                        </FormGroup>
                      </>
                    )}
                    
                    {step === 3 && (
                      <>
                        <FormGroup>
                          <Label for="experience">Experience Required</Label>
                          <Input
                            id="experience"
                            name="experience"
                            placeholder="e.g. 3+ years"
                            value={formData.experience}
                            onChange={handleChange}
                            invalid={!!errors.experience}
                          />
                          <FormFeedback>{errors.experience}</FormFeedback>
                        </FormGroup>
                        
                        <FormGroup>
                          <Label for="education">Education Required</Label>
                          <Input
                            id="education"
                            name="education"
                            placeholder="e.g. Bachelor's degree in Computer Science"
                            value={formData.education}
                            onChange={handleChange}
                            invalid={!!errors.education}
                          />
                          <FormFeedback>{errors.education}</FormFeedback>
                        </FormGroup>
                        
                        <FormGroup>
                          <Label>Required Skills</Label>
                          {formData.skills.map((skill, index) => (
                            <div key={index} className="d-flex mb-2">
                              <Input
                                placeholder={`Skill ${index + 1}`}
                                value={skill}
                                onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                                invalid={errors.skills && !skill.trim()}
                              />
                              {formData.skills.length > 1 && (
                                <Button
                                  type="button"
                                  color="link"
                                  className="text-danger ms-2"
                                  onClick={() => removeArrayItem('skills', index)}
                                >
                                  <FontAwesomeIcon icon={faMinus} />
                                </Button>
                              )}
                            </div>
                          ))}
                          {errors.skills && (
                            <div className="text-danger small mb-2">{errors.skills}</div>
                          )}
                          <Button
                            type="button"
                            color="outline-primary"
                            size="sm"
                            onClick={() => addArrayItem('skills')}
                          >
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Add Skill
                          </Button>
                        </FormGroup>
                        
                        <FormGroup>
                          <Label for="deadline">Application Deadline</Label>
                          <Input
                            id="deadline"
                            name="deadline"
                            type="date"
                            value={formData.deadline}
                            onChange={handleChange}
                            invalid={!!errors.deadline}
                          />
                          <FormFeedback>{errors.deadline}</FormFeedback>
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
                      
                      {step < 3 ? (
                        <Button type="button" color="primary" onClick={nextStep}>
                          Next
                          <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
                        </Button>
                      ) : (
                        <Button type="submit" color="primary" disabled={loading}>
                          {loading ? 'Posting Job...' : 'Post Job'}
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
  );
};

export default PostJobPage;