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
import EditRecipe from '../../components/EditRecipe'
import Navigation from '../../components/Navegation'
import { getRecipe } from '../../store/RecipeReducer'
import { useDispatch, useSelector } from 'react-redux'


export function EditRecipes() {

  const dispatch = useDispatch()
  const { idRecipe } = useParams()

  useEffect(() => {
    dispatch(getRecipe(idRecipe))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, idRecipe])

  const {  oneRecipe, loading, error } = useSelector(({
    RecipeReducer
  }) => ({
    loading: RecipeReducer.loading,
    error: RecipeReducer.error,
    oneRecipe: RecipeReducer.oneRecipe
  }))

  return(
    <>
      <Row>
        <Col>
          <Navigation top="top"/>
        </Col>
      </Row>
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
      <Container className="container-landing">
        <div className="contenedor-dos">
          {error &&
            <Alert variant="danger" className="alert-myrecipes">
              lo sentimos, hubo un error al cargar la información.
            </Alert>
          }
          {!loading && oneRecipe &&
            <Row className="row-cards">
              <Col className="cards-individual flex-wrap d-flex">
                <EditRecipe oneRecipe={oneRecipe} loading={loading} error={error} />
              </Col>
            </Row>
          }
        </div>
      </Container>
      <Footer />
    </>
  )
}