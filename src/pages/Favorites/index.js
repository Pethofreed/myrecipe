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
import Navigation from '../../components/Navegation'
import { useDispatch, useSelector } from 'react-redux'
import FavoriteCard from '../../components/FavoritesCards'
import { getFavorites } from '../../store/FavoritesReducer'
import { getAllRecipes } from '../../store/AllRecipesReducer'

export function Favorites() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavorites())
    dispatch(getAllRecipes())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const { allRecipes, favorites, loading, error } = useSelector(({
    FavoritesReducer, AllRecipesReducer
  }) => ({
    loading: FavoritesReducer.loading,
    error: FavoritesReducer.error,
    favorites: FavoritesReducer.favoritesRecipes,
    allRecipes: AllRecipesReducer.allRecipes
  }))

  const recipes = []

  favorites.forEach( favorite => {
    allRecipes.forEach(recipe => {
      if(recipe.id === favorite.recipeid){
        recipes.push(recipe)
      }
    })
  })

  return(
    <>
      <Row className="row-navegation-favorites">
        <Col>
          <Navigation top="top"/>
        </Col>
      </Row>
      {!!recipes && recipes.length > 0 ?
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
                <FavoriteCard recipes={recipes} />
              </Col>
            </Row>
          </div>
        </Container>
      :
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