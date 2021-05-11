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
            <Row className="row">
              <Col xs={10} sm={7} md={5} lg={4} xl={3} className="form-into-column">
                <SignIn />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
