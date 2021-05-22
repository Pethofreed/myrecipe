import {
  Container,
  Spinner,
  Button,
  Alert,
  Row,
  Col
} from 'react-bootstrap'
import './styles.css'
import { useEffect } from 'react'
import Footer from '../../components/Footer'
import Navigation from "../../components/Navegation"
import { useDispatch, useSelector } from 'react-redux'
import LandingCard from '../../components/LandingCards'
import { getAllRecipes } from '../../store/AllRecipesReducer'


export function LandingPage() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllRecipes())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const {  AllRecipes, loading, error } = useSelector(({
    AllRecipesReducer
  }) => ({
    loading: AllRecipesReducer.loading,
    error: AllRecipesReducer.error,
    AllRecipes: AllRecipesReducer.allRecipes
  }))

  return(
    <>
      <Row>
        <Col>
          <Navigation top="top"/>
        </Col>
      </Row>
      <Container className="container-landing">
        <div className="contenedor-dos">
          {loading &&
            <Row className="row-btn-cargando">
              <Col className="btn-loading">
                <Button variant="primary" className="loading-message" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Cargando . . .
                </Button>
              </Col>
            </Row>
          }
          {error &&
            <Alert variant="danger" className="alert-myrecipes">
              lo sentimos, hubo un error al cargar la información.
            </Alert>
          }
          <Row className="row-cards">
            <Col className="cards-individual flex-wrap d-flex">
              <LandingCard allRecipes={AllRecipes} />
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  )
}