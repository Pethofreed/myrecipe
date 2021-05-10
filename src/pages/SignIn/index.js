import { Container,
  Row,
  Col
  } from 'react-bootstrap'
  import './styles.css'
  import 'bootstrap/dist/css/bootstrap.min.css';
  import SignIn from '../../components/Signin'
  
  export function SigninForm() {
    return(
      <Container fluid>
        <Row className="fondo-signin">
          <Col sm={12}>
            <Row>
              <Col sm={3}>
                <SignIn />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
