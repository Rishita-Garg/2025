import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Progress,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Badge
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faBriefcase, 
  faFileAlt, 
  faBookmark, 
  faCog, 
  faSignOutAlt,
  faMapMarkerAlt,
  faDollarSign,
  faClock,
  faUpload,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { mockJobs } from '../data/mockData';

const JobSeekerDashboard = () => {
  const { currentUser, logout, updateUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('1');
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  
  useEffect(() => {
    if (currentUser) {
      // Get saved and applied jobs
      setSavedJobs(currentUser.savedJobs || []);
      setAppliedJobs(currentUser.appliedJobs || []);
    }
  }, [currentUser]);
  
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };
  
  const handleRemoveSavedJob = (jobId) => {
    const updatedSavedJobs = savedJobs.filter(id => id !== jobId);
    setSavedJobs(updatedSavedJobs);
    updateUser({ savedJobs: updatedSavedJobs });
  };
  
  // Filter jobs based on saved and applied jobs
  const savedJobsList = mockJobs.filter(job => savedJobs.includes(job.id));
  const appliedJobsList = mockJobs.filter(job => appliedJobs.includes(job.id));
  
  return (
    <div>
      <Header />
      
      <main className="main-content">
        <Container className="py-5">
          <Row>
            <Col lg={3}>
              <Card className="mb-4 shadow-sm">
                <CardBody className="text-center">
                  <div className="mb-3">
                    <img 
                      src={currentUser?.avatar || "https://via.placeholder.com/100"} 
                      alt={currentUser?.name} 
                      className="rounded-circle" 
                      width="100" 
                    />
                  </div>
                  <h5>{currentUser?.name}</h5>
                  <p className="text-muted">{currentUser?.email}</p>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between text-muted small mb-1">
                      <span>Profile Completion</span>
                      <span>70%</span>
                    </div>
                    <Progress value={70} />
                  </div>
                </CardBody>
              </Card>
              
              <Card className="shadow-sm">
                <CardBody className="p-0">
                  <Nav vertical className="flex-column">
                    <NavItem>
                      <NavLink 
                        active={activeTab === '1'} 
                        onClick={() => toggle('1')}
                        className="d-flex align-items-center"
                      >
                        <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                        Dashboard
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                        active={activeTab === '2'} 
                        onClick={() => toggle('2')}
                        className="d-flex align-items-center"
                      >
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        My Profile
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                        active={activeTab === '3'} 
                        onClick={() => toggle('3')}
                        className="d-flex align-items-center"
                      >
                        <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                        Resume
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                        active={activeTab === '4'} 
                        onClick={() => toggle('4')}
                        className="d-flex align-items-center"
                      >
                        <FontAwesomeIcon icon={faBookmark} className="me-2" />
                        Saved Jobs
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                        active={activeTab === '5'} 
                        onClick={() => toggle('5')}
                        className="d-flex align-items-center"
                      >
                        <FontAwesomeIcon icon={faCog} className="me-2" />
                        Settings
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                        onClick={logout}
                        className="d-flex align-items-center text-danger"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                        Logout
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardBody>
              </Card>
            </Col>
            
            <Col lg={9}>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <h4 className="mb-4">Dashboard</h4>
                  
                  <Row className="mb-4">
                    <Col md={4} className="mb-4 mb-md-0">
                      <Card className="shadow-sm h-100">
                        <CardBody className="text-center">
                          <div className="dashboard-stat text-primary">{appliedJobs.length}</div>
                          <div className="dashboard-label">Applied Jobs</div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md={4} className="mb-4 mb-md-0">
                      <Card className="shadow-sm h-100">
                        <CardBody className="text-center">
                          <div className="dashboard-stat text-success">{savedJobs.length}</div>
                          <div className="dashboard-label">Saved Jobs</div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="shadow-sm h-100">
                        <CardBody className="text-center">
                          <div className="dashboard-stat text-info">24</div>
                          <div className="dashboard-label">Profile Views</div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  
                  <Card className="shadow-sm mb-4">
                    <CardHeader>
                      <h5 className="mb-0">Quick Resume Upload</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1 me-3">
                          <input
                            id="resume-upload"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="d-none"
                          />
                          <Button
                            color="outline-primary"
                            block
                            onClick={() => document.getElementById('resume-upload').click()}
                          >
                            <FontAwesomeIcon icon={faUpload} className="me-2" />
                            {resumeFile ? 'Change Resume' : 'Upload Resume'}
                          </Button>
                          {resumeFile && (
                            <div className="mt-2 text-muted small">
                              {resumeFile.name}
                              <Button
                                color="link"
                                size="sm"
                                className="p-0 ms-2 text-danger"
                                onClick={() => setResumeFile(null)}
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </Button>
                            </div>
                          )}
                        </div>
                        <Button color="primary" disabled={!resumeFile}>
                          Save
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                  
                  <Card className="shadow-sm">
                    <CardHeader>
                      <h5 className="mb-0">Recent Applications</h5>
                    </CardHeader>
                    <CardBody>
                      {appliedJobsList.length > 0 ? (
                        appliedJobsList.slice(0, 3).map(job => (
                          <Card key={job.id} className="mb-3 border">
                            <CardBody>
                              <Row>
                                <Col xs={12} md={8}>
                                  <div className="d-flex align-items-center mb-2">
                                    <img 
                                      src={job.company.logo || "https://via.placeholder.com/40"} 
                                      alt={job.company.name} 
                                      className="me-3" 
                                      width="40" 
                                      height="40"
                                    />
                                    <div>
                                      <h6 className="mb-0">{job.title}</h6>
                                      <div className="text-muted small">{job.company.name}</div>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-wrap text-muted small mb-2">
                                    <div className="me-3">
                                      <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
                                      {job.location}
                                    </div>
                                    <div className="me-3">
                                      <FontAwesomeIcon icon={faDollarSign} className="me-1" />
                                      {job.salary}
                                    </div>
                                    <div>
                                      <FontAwesomeIcon icon={faClock} className="me-1" />
                                      Applied {job.postedAt}
                                    </div>
                                  </div>
                                </Col>
                                <Col xs={12} md={4} className="d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
                                  <Badge color="info" className="me-2">Application in Review</Badge>
                                  <Button color="outline-primary" size="sm" tag={Link} to={`/jobs/${job.id}`}>
                                    View
                                  </Button>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-5">
                          <FontAwesomeIcon icon={faBriefcase} size="3x" className="text-muted mb-3" />
                          <h5>No applications yet</h5>
                          <p className="text-muted">Start applying to jobs to see them here</p>
                          <Button color="primary" tag={Link} to="/jobs">
                            Browse Jobs
                          </Button>
                        </div>
                      )}
                      
                      {appliedJobsList.length > 3 && (
                        <div className="text-center mt-3">
                          <Button color="link" onClick={() => toggle('4')}>
                            View All Applications
                          </Button>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </TabPane>
                
                <TabPane tabId="2">
                  <h4 className="mb-4">My Profile</h4>
                  <Card className="shadow-sm">
                    <CardBody>
                      <p className="text-center py-5">Profile content will be implemented here</p>
                    </CardBody>
                  </Card>
                </TabPane>
                
                <TabPane tabId="3">
                  <h4 className="mb-4">Resume</h4>
                  <Card className="shadow-sm">
                    <CardBody>
                      <p className="text-center py-5">Resume content will be implemented here</p>
                    </CardBody>
                  </Card>
                </TabPane>
                
                <TabPane tabId="4">
                  <h4 className="mb-4">Saved Jobs</h4>
                  
                  {savedJobsList.length > 0 ? (
                    savedJobsList.map(job => (
                      <Card key={job.id} className="mb-3 shadow-sm">
                        <CardBody>
                          <Row>
                            <Col xs={12} md={8}>
                              <div className="d-flex align-items-center mb-2">
                                <img 
                                  src={job.company.logo || "https://via.placeholder.com/40"} 
                                  alt={job.company.name} 
                                  className="me-3" 
                                  width="40" 
                                  height="40"
                                />
                                <div>
                                  <h6 className="mb-0">{job.title}</h6>
                                  <div className="text-muted small">{job.company.name}</div>
                                </div>
                              </div>
                              <div className="d-flex flex-wrap text-muted small mb-2">
                                <div className="me-3">
                                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
                                  {job.location}
                                </div>
                                <div className="me-3">
                                  <FontAwesomeIcon icon={faDollarSign} className="me-1" />
                                  {job.salary}
                                </div>
                                <div>
                                  <FontAwesomeIcon icon={faClock} className="me-1" />
                                  Posted {job.postedAt}
                                </div>
                              </div>
                            </Col>
                            <Col xs={12} md={4} className="d-flex flex-wrap align-items-center justify-content-md-end mt-3 mt-md-0">
                              <Button 
                                color="primary" 
                                size="sm" 
                                className="me-2 mb-2 mb-md-0"
                                tag={Link} 
                                to={`/jobs/${job.id}/apply`}
                              >
                                Apply
                              </Button>
                              <Button 
                                color="outline-primary" 
                                size="sm" 
                                className="me-2 mb-2 mb-md-0"
                                tag={Link} 
                                to={`/jobs/${job.id}`}
                              >
                                View
                              </Button>
                              <Button 
                                color="outline-danger" 
                                size="sm"
                                className="mb-2 mb-md-0"
                                onClick={() => handleRemoveSavedJob(job.id)}
                              >
                                Remove
                              </Button>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    ))
                  ) : (
                    <Card className="shadow-sm">
                      <CardBody className="text-center py-5">
                        <FontAwesomeIcon icon={faBookmark} size="3x" className="text-muted mb-3" />
                        <h5>No saved jobs</h5>
                        <p className="text-muted">Save jobs you're interested in to apply later</p>
                        <Button color="primary" tag={Link} to="/jobs">
                          Browse Jobs
                        </Button>
                      </CardBody>
                    </Card>
                  )}
                </TabPane>
                
                <TabPane tabId="5">
                  <h4 className="mb-4">Settings</h4>
                  <Card className="shadow-sm">
                    <CardBody>
                      <p className="text-center py-5">Settings content will be implemented here</p>
                    </CardBody>
                  </Card>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobSeekerDashboard;