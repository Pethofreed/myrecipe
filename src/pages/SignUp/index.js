import { Container,
Row,
Col
} from 'react-bootstrap'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from '../../components/Signup'

export function SignupForm() {
  return(
    <Container fluid>
      <Row className="fondo-signup">
        <Col sm={12}>
          <Row className="row">
            <Col sm={4} md={3} className="form-into-column">
              <SignUp />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}