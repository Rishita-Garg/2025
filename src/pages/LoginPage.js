"use client"

import { useState, useContext } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
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
} from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { AuthContext } from "../context/AuthContext"

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Get redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const user = await login(email, password)

      // Redirect based on user role
      if (user.role === "jobseeker") {
        navigate("/dashboard")
      } else if (user.role === "employer") {
        navigate("/employer/dashboard")
      }
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

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
                    <h2 className="mb-1">Welcome Back</h2>
                    <p className="text-muted">Sign in to your account</p>
                  </div>

                  {error && (
                    <Alert color="danger" className="mb-4">
                      {error}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                      <Label for="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </FormGroup>

                    <FormGroup className="mb-3">
                      <div className="d-flex justify-content-between">
                        <Label for="password">Password</Label>
                        <Link to="/forgot-password" className="text-decoration-none small">
                          Forgot password?
                        </Link>
                      </div>
                      <InputGroup>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <InputGroupText className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </InputGroupText>
                      </InputGroup>
                    </FormGroup>

                    <FormGroup check className="mb-4">
                      <Label check>
                        <Input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />{" "}
                        Remember me
                      </Label>
                    </FormGroup>

                    <div className="d-grid mb-4">
                      <Button color="primary" size="lg" type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="mb-0">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-decoration-none">
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </Form>
                </CardBody>
              </Card>

              <div className="text-center mt-4">
                
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  )
}

export default LoginPage

