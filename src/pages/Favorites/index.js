import {
  Container,
  Alert,
  Row,
  Col
} from 'react-bootstrap'
import './styles.css'
import Navigation from '../../components/Navegation'
import Footer from '../../components/Footer'

export function Favorites() {

  const favorites = []

  return(
    <>
      <Row className="row-navegation-favorites">
        <Col>
          <Navigation />
        </Col>
      </Row>
      {!!favorites && favorites.length > 0 ? <h1>Hola mundo</h1> :
        <Container>
          <Row className="row-no-favorites">
            <Col className="col-no-favorites">
            <Alert variant="warning">
              <h2>No tienes favoritos aún</h2>
            </Alert>
            </Col>
          </Row>
        </Container>
      }
      <Footer />
    </>
  )
}