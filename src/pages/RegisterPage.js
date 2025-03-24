import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Alert,
  InputGroup,
  InputGroupText,
  FormFeedback
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'jobseeker',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const user = await register(formData);
      
      // Redirect based on user role
      if (user.role === 'jobseeker') {
        navigate('/dashboard');
      } else if (user.role === 'employer') {
        navigate('/employer/dashboard');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  
  return (
    <div>
      <Header />
      
      <main className="main-content">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="shadow">
                <CardBody className="p-4 p-md-5">
                  <div className="text-center mb-4">
                    <FontAwesomeIcon icon={faBriefcase} size="3x" className="text-primary mb-3" />
                    <h2 className="mb-1">Create an Account</h2>
                    <p className="text-muted">Join our job portal today</p>
                  </div>
                  
                  {error && (
                    <Alert color="danger" className="mb-4">
                      {error}
                    </Alert>
                  )}
                  
                  <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                      <Label for="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        invalid={!!errors.name}
                      />
                      <FormFeedback>{errors.name}</FormFeedback>
                    </FormGroup>
                    
                    <FormGroup className="mb-3">
                      <Label for="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        invalid={!!errors.email}
                      />
                      <FormFeedback>{errors.email}</FormFeedback>
                    </FormGroup>
                    
                    <FormGroup className="mb-3">
                      <Label for="password">Password</Label>
                      <InputGroup>
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          invalid={!!errors.password}
                        />
                        <InputGroupText 
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </InputGroupText>
                        <FormFeedback>{errors.password}</FormFeedback>
                      </InputGroup>
                    </FormGroup>
                    
                    <FormGroup className="mb-3">
                      <Label for="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        invalid={!!errors.confirmPassword}
                      />
                      <FormFeedback>{errors.confirmPassword}</FormFeedback>
                    </FormGroup>
                    
                    <FormGroup className="mb-4">
                      <Label>I am a</Label>
                      <div className="d-flex">
                        <FormGroup check className="me-4">
                          <Label check>
                            <Input
                              type="radio"
                              name="role"
                              value="jobseeker"
                              checked={formData.role === 'jobseeker'}
                              onChange={handleChange}
                            />{' '}
                            Job Seeker
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="radio"
                              name="role"
                              value="employer"
                              checked={formData.role === 'employer'}
                              onChange={handleChange}
                            />{' '}
                            Employer
                          </Label>
                        </FormGroup>
                      </div>
                    </FormGroup>
                    
                    <div className="d-grid mb-4">
                      <Button 
                        color="primary" 
                        size="lg" 
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? 'Creating account...' : 'Create Account'}
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <p className="mb-0">
                        Already have an account?{' '}
                        <Link to="/login" className="text-decoration-none">
                          Sign in
                        </Link>
                      </p>
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

export default RegisterPage;