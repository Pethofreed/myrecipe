import {
  ListGroup,
  Container,
  Spinner,
  Button,
  Image,
  Badge,
  Row,
  Col
} from 'react-bootstrap'
import './styles.css'
import Footer from '../../components/Footer'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { getRecipe } from '../../store/RecipeReducer'
import { useDispatch, useSelector } from 'react-redux'

function ViewRecipe() {

  const dispatch = useDispatch()
  const { idRecipe } = useParams()

  useEffect(() => {
    dispatch(getRecipe(idRecipe))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, idRecipe])

  const { oneRecipe, loading, error } = useSelector(({
    RecipeReducer
  }) => ({
    error: RecipeReducer.error,
    loading: RecipeReducer.loading,
    oneRecipe: RecipeReducer.oneRecipe,
  }))

  const separarPorComas = /\s*,\s*/
  const ingredients = !!oneRecipe && !!oneRecipe.ingredients && oneRecipe.ingredients.split(separarPorComas)

  return (
    <>
      {error && <p>Lo sentimos, ha ocurrido un error.</p>}
      {loading &&
        <Row className="loading-recipe-row">
          <Col className="loading-recipe-col">
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
      {!loading &&
        <>
          <Container className="container-view-recipe">
            <Row className="row-view-picture-recipe">
              <Col className="col-view-picture-recipe">
                <Image
                  src={oneRecipe.picture}
                  alt="foto de la receta"
                  className="img-recipe"
                />
              </Col>
            </Row>
            <Row className="row-view-title-recipe">
              <Col className="col-view-title-recipe">
                <p>{oneRecipe.title}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <ListGroup variant="flush"  className="ingredients-list">
                  <ListGroup.Item>
                    INGREDIENTES
                  </ListGroup.Item>
                  {!!ingredients && ingredients.length > 0 && ingredients.map(ingredient =>
                    <ListGroup.Item>
                      <li  className="item-lista-ingredients">
                        {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                      </li>
                    </ListGroup.Item>
                  )}
              </ListGroup>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col className="text-center">
                <h4>INSTRUCCIONES</h4>
              </Col>
            </Row>
            <div className="description-recipe">
              <p>{oneRecipe.description}</p>
            </div>
          </Container>
          <Footer />
        </>
      }
    </>
  )
}

export default ViewRecipe