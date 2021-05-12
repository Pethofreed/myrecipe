import { Container,
  Row,
  Col
  } from 'react-bootstrap'
  import './styles.css'
  import 'bootstrap/dist/css/bootstrap.min.css';
  import SignIn from '../../components/Signin'
  import Navigation from '../../components/Navegation'

  export function SigninForm() {
    return(
      <>
        <Navigation />
        <Container fluid>
          <Row className="fondo-signin">
            <Col sm={12} className="text-center">
              <Row className="row">
                <Col xs={10} sm={7} md={5} lg={4} xl={3} className="form-into-column">
                  <SignIn />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
