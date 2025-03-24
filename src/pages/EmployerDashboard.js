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
  Badge,
  Input,
  InputGroup,
  InputGroupText
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, 
  faBriefcase, 
  faUsers, 
  faChartLine, 
  faCog, 
  faSignOutAlt,
  faPlus,
  faSearch,
  faFilter,
  faFileAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { mockJobs, mockApplications, mockUsers } from '../data/mockData';

const EmployerDashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  
  // Filter applications based on search and status
  const filteredApplications = mockApplications.filter(application => {
    const job = mockJobs.find(job => job.id === application.jobId);
    const applicant = mockUsers.find(user => user.id === application.userId);
    
    if (!job || !applicant) return false;
    
    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || application.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Get company jobs
  const companyJobs = currentUser?.company 
    ? mockJobs.filter(job => job.company.id === currentUser.company.id) 
    : [];
  
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
                      <span>Company Profile</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} />
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
                        <FontAwesomeIcon icon={faBuilding} className="me-2" />
                        Dashboard
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                        active={activeTab === '2'} 
                        onClick={() => toggle('2')}
                        className="d-flex align-items-center"
                      >
                        <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                        Manage Jobs
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                        active={activeTab === '3'} 
                        onClick={() => toggle('3')}
                        className="d-flex align-items-center"
                      >
                        <FontAwesomeIcon icon={faUsers} className="me-2" />
                        Candidates
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                        active={activeTab === '4'} 
                        onClick={() => toggle('4')}
                        className="d-flex align-items-center"
                      >
                        <FontAwesomeIcon icon={faChartLine} className="me-2" />
                        Analytics
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
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Employer Dashboard</h4>
                <Button color="primary" tag={Link} to="/employer/post-job">
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Post a Job
                </Button>
              </div>
              
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row className="mb-4">
                    <Col md={4} className="mb-4 mb-md-0">
                      <Card className="shadow-sm h-100">
                        <CardBody className="text-center">
                          <div className="dashboard-stat text-primary">{companyJobs.length}</div>
                          <div className="dashboard-label">Active Jobs</div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md={4} className="mb-4 mb-md-0">
                      <Card className="shadow-sm h-100">
                        <CardBody className="text-center">
                          <div className="dashboard-stat text-success">{filteredApplications.length}</div>
                          <div className="dashboard-label">Total Applications</div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="shadow-sm h-100">
                        <CardBody className="text-center">
                          <div className="dashboard-stat text-info">142</div>
                          <div className="dashboard-label">Profile Views</div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  
                  <Card className="shadow-sm mb-4">
                    <CardHeader>
                      <h5 className="mb-0">Recent Applications</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="mb-4">
                        <InputGroup>
                          <InputGroupText>
                            <FontAwesomeIcon icon={faSearch} />
                          </InputGroupText>
                          <Input 
                            placeholder="Search applications..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <Input 
                            type="select" 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                          >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="interviewed">Interviewed</option>
                            <option value="offered">Offered</option>
                            <option value="rejected">Rejected</option>
                          </Input>
                          <Button color="primary">
                            <FontAwesomeIcon icon={faFilter} />
                          </Button>
                        </InputGroup>
                      </div>
                      
                      {filteredApplications.length > 0 ? (
                        filteredApplications.slice(0, 3).map(application => {
                          const job = mockJobs.find(job => job.id === application.jobId);
                          const applicant = mockUsers.find(user => user.id === application.userId);
                          
                          if (!job || !applicant) return null;
                          
                          return (
                            <Card key={application.id} className="mb-3 border">
                              <CardBody>
                                <Row>
                                  <Col xs={12} md={8}>
                                    <div className="d-flex align-items-center mb-2">
                                      <img 
                                        src={applicant.avatar || "https://via.placeholder.com/40"} 
                                        alt={applicant.name} 
                                        className="me-3" 
                                        width="40" 
                                        height="40"
                                      />
                                      <div>
                                        <h6 className="mb-0">{applicant.name}</h6>
                                        <div className="text-muted small">Applied for {job.title}</div>
                                      </div>
                                    </div>
                                    <div className="d-flex flex-wrap text-muted small mb-2">
                                      <div className="me-3">
                                        <FontAwesomeIcon icon={faClock} className="me-1" />
                                        Applied on {new Date(application.appliedAt).toLocaleDateString()}
                                      </div>
                                      <div>
                                        <FontAwesomeIcon icon={faFileAlt} className="me-1" />
                                        <Link to="#" className="text-decoration-none">View Resume</Link>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xs={12} md={4} className="d-flex flex-wrap align-items-center justify-content-md-end mt-3 mt-md-0">
                                    <Badge 
                                      color={
                                        application.status === "pending" ? "secondary" :
                                        application.status === "reviewed" ? "info" :
                                        application.status === "interviewed" ? "primary" :
                                        application.status === "offered" ? "success" : "danger"
                                      } 
                                      className="me-2 mb-2"
                                    >
                                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                    </Badge>
                                    <Button color="outline-primary" size="sm" className="mb-2">
                                      Review
                                    </Button>
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          );
                        })
                      ) : (
                        <div className="text-center py-5">
                          <FontAwesomeIcon icon={faUsers} size="3x" className="text-muted mb-3" />
                          <h5>No applications found</h5>
                          <p className="text-muted">
                            {searchTerm || statusFilter !== "all"
                              ? "Try adjusting your search or filter"
                              : "Post a job to start receiving applications"}
                          </p>
                          {searchTerm || statusFilter !== "all" ? (
                            <Button 
                              color="outline-primary" 
                              onClick={() => {
                                setSearchTerm("");
                                setStatusFilter("all");
                              }}
                            >
                              Clear Filters
                            </Button>
                          ) : (
                            <Button color="primary" tag={Link} to="/employer/post-job">
                              Post a Job
                            </Button>
                          )}
                        </div>
                      )}
                      
                      {filteredApplications.length > 3 && (
                        <div className="text-center mt-3">
                          <Button color="link" onClick={() => toggle('3')}>
                            View All Applications
                          </Button>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </TabPane>
                
                <TabPane tabId="2">
                  <h5 className="mb-4">Manage Jobs</h5>
                  
                  {companyJobs.length > 0 ? (
                    companyJobs.map(job => (
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
                                  <div className="text-muted small">{job.location}</div>
                                </div>
                              </div>
                              <div className="d-flex flex-wrap mb-2">
                                <Badge color="primary" className="me-2 mb-2">{job.type}</Badge>
                                {job.isRemote && <Badge color="info" className="me-2 mb-2">Remote</Badge>}
                                <Badge color="secondary" className="me-2 mb-2">{job.category}</Badge>
                              </div>
                              <div className="text-muted small">
                                Posted {job.postedAt} • Expires {job.deadline}
                              </div>
                            </Col>
                            <Col xs={12} md={4} className="d-flex flex-wrap align-items-center justify-content-md-end mt-3 mt-md-0">
                              <Button color="outline-primary" size="sm" className="me-2 mb-2" tag={Link} to={`/jobs/${job.id}`}>
                                View
                              </Button>
                              <Button color="outline-secondary" size="sm" className="me-2 mb-2">
                                Edit
                              </Button>
                              <Button color="outline-danger" size="sm" className="mb-2">
                                Delete
                              </Button>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    ))
                  ) : (
                    <Card className="shadow-sm">
                      <CardBody className="text-center py-5">
                        <FontAwesomeIcon icon={faBriefcase} size="3x" className="text-muted mb-3" />
                        <h5>No jobs posted yet</h5>
                        <p className="text-muted">Start posting jobs to find the perfect candidates</p>
                        <Button color="primary" tag={Link} to="/employer/post-job">
                          Post a Job
                        </Button>
                      </CardBody>
                    </Card>
                  )}
                </TabPane>
                
                <TabPane tabId="3">
                  <h5 className="mb-4">Candidates</h5>
                  <Card className="shadow-sm">
                    <CardBody>
                      <p className="text-center py-5">Candidates content will be implemented here</p>
                    </CardBody>
                  </Card>
                </TabPane>
                
                <TabPane tabId="4">
                  <h5 className="mb-4">Analytics</h5>
                  <Card className="shadow-sm">
                    <CardBody>
                      <p className="text-center py-5">Analytics content will be implemented here</p>
                    </CardBody>
                  </Card>
                </TabPane>
                
                <TabPane tabId="5">
                  <h5 className="mb-4">Settings</h5>
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

export default EmployerDashboard;