import { Container,
Row,
Col
} from 'react-bootstrap'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from '../../components/Signup'
import Navigation from '../../components/Navegation'

export function SignupForm() {
  return(
    <>
      <Navigation top="top" />
      <Container fluid>
      <Row className="fondo-signup">
        <Col sm={12} >
          <Row className="row">
            <Col xs={10} sm={7} md={5} lg={4} xl={3} className="form-into-column">
              <SignUp />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    </>
  )
}