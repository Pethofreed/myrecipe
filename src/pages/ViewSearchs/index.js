import {
  Container,
  Spinner,
  Button,
  Alert,
  Row,
  Col
} from 'react-bootstrap'
import './styles.css'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import Footer from '../../components/Footer'
import Navigation from "../../components/Navegation"
import { useDispatch, useSelector } from 'react-redux'
import LandingCard from '../../components/LandingCards'
import { getSearch } from '../../store/SearchReducer'


export function ViewSearchs() {

  const dispatch = useDispatch()
  const { search } = useParams()

  useEffect(() => {
    dispatch(getSearch(search))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search])

  const {  searchResult, loading, error } = useSelector(({
    SearchReducer
  }) => ({
    loading: SearchReducer.loading,
    error: SearchReducer.error,
    searchResult: SearchReducer.searchResult
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
            <Row className="row-btn-cargando row-loading">
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
          {!loading && searchResult.length === 0 &&
            <Row className="row-cards row-message">
              <Col className="cards-individual flex-wrap d-flex">
                <p className="m-auto mt-3 message-no-results">
                  No se han encontrado recetas, prueba con otra palabra.
                </p>
              </Col>
            </Row>
          }
          {!loading && searchResult &&
            <Row className="row-cards">
              <Col className="cards-individual flex-wrap d-flex">
                <LandingCard allRecipes={searchResult} />
              </Col>
            </Row>
          }
        </div>
      </Container>
      <Footer />
    </>
  )
}