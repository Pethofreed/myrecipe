import {
  ListGroup,
  Container,
  Spinner,
  Button,
  Image,
  Row,
  Col
} from 'react-bootstrap'
import './styles.css'
import axios from 'axios'
import { useParams } from 'react-router'
import ImageSuccess from './success.png'
import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import { getUser } from '../../store/UserReducer'
import { getRecipe } from '../../store/RecipeReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getFavorites } from '../../store/FavoritesReducer'

function ViewRecipe() {

  let isFavorite = false
  const dispatch = useDispatch()
  const { idRecipe } = useParams()
  const [likeError, setLikeError] = useState(null)
  const [likeSuccess, setLikeSuccess] = useState(null)
  const [favoriteError, setFavoriteError] = useState(null)
  const [favoriteSuccess, setFavoriteSuccess] = useState(null)
  const [favoriteDeleteError, setFavoriteDeleteError] = useState(null)
  const [favoriteDeleteSuccess, setFavoriteDeleteSuccess] = useState(null)

  useEffect(() => {
    const auth = localStorage.getItem('token')
    setLikeSuccess(null)
    setLikeError(null)
    setFavoriteSuccess(null)
    setFavoriteError(null)
    setFavoriteDeleteSuccess(null)
    setFavoriteDeleteError(null)
    {auth && dispatch(getFavorites())}
    {auth && dispatch(getUser())}
    dispatch(getRecipe(idRecipe))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, idRecipe])

  const { oneRecipe, loading, error, user, favorites } = useSelector(({
    RecipeReducer, UserReducer, FavoritesReducer
  }) => ({
    error: RecipeReducer.error,
    loading: RecipeReducer.loading,
    oneRecipe: RecipeReducer.oneRecipe,
    user: UserReducer.user,
    favorites: FavoritesReducer.favoritesRecipes
  }))

  const token = localStorage.getItem('token')

  async function handleLike(id){
    try {
      await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/recipes/addPoint',
        data: {
          id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setLikeSuccess(true)
      setLikeError(null)
      setFavoriteSuccess(null)
      setFavoriteError(null)
      setFavoriteDeleteSuccess(null)
      setFavoriteDeleteError(null)
    } catch (error) {
      setLikeError(error.message)
    }
  }

  async function handleFavorites(id){
    try {
      await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/favorites/add',
        data: {
          recipeid: id
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setFavoriteSuccess(true)
      setLikeSuccess(null)
      setLikeError(null)
      setFavoriteError(null)
      setFavoriteDeleteSuccess(null)
      setFavoriteDeleteError(null)
      dispatch(getFavorites())
    } catch (error) {
      setFavoriteError(error.message)
    }
  }

  async function handleFavoriteDelete(id){
    try {
      await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/favorites/destroy',
        data: {
          recipeid: id
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setFavoriteDeleteSuccess(true)
      setLikeSuccess(null)
      setLikeError(null)
      setFavoriteSuccess(null)
      setFavoriteError(null)
      setFavoriteDeleteError(null)
      dispatch(getFavorites())
    } catch (error) {
      setFavoriteDeleteError(error.message)
    }
  }

  const { User } = oneRecipe
  const separarPorComas = /\s*,\s*/
  const ingredients = !!oneRecipe && !!oneRecipe.ingredients && oneRecipe.ingredients.split(separarPorComas)
  const description = oneRecipe.description

  favorites.forEach( favorite => {
    if(favorite.recipeid === oneRecipe.id){
      return isFavorite = true
    }
  })


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
            {token &&
              <Row className="btns">
                <Col className="btn-like">
                  {!!User && User.id !== user.id &&
                    <Button
                      size="sm"
                      className="btn-group"
                      onClick={e => handleLike(oneRecipe.id)}
                    >Me gusta</Button>
                  }
                  {isFavorite &&
                    <Button
                      size="sm"
                      className="btn-group"
                      onClick={e => handleFavoriteDelete(oneRecipe.id)}
                    >Quitar de Favoritos</Button>
                  }
                  {!isFavorite &&
                    <Button
                      size="sm"
                      className="btn-group"
                      onClick={e => handleFavorites(oneRecipe.id)}
                    >
                      Añadir a Favoritos
                    </Button>
                  }
                  {!!User && User.id === user.id &&
                    <Button
                      size="sm"
                      className="btn-group"
                      href={`/edit/${oneRecipe.id}`}
                    >Editar Receta</Button>
                  }
                </Col>
              </Row>
            }
            {likeSuccess &&
              <Row className="row-message-success">
                <Col className="col-message-success">
                  <p>
                    <img src={ImageSuccess} alt="img-succees" class="success-op" />
                    Hemos añadido tu puntuación.
                  </p>
                </Col>
              </Row>
            }
            {likeError &&
              <Row className="row-message-success">
                <Col className="col-message-success">
                  <p>¡ups! ha ocurrido un error.</p>
                </Col>
              </Row>
            }
            {favoriteSuccess &&
              <Row className="row-message-success">
                <Col className="col-message-success">
                  <p>
                    <img src={ImageSuccess} alt="img-succees" class="success-op" />
                    Se ha añadido a tus favoritos.
                  </p>
                </Col>
              </Row>
            }
            {favoriteError &&
              <Row className="row-message-success">
                <Col className="col-message-success">
                  <p>¡ups! ha ocurrido un error.</p>
                </Col>
              </Row>
            }
            {favoriteDeleteSuccess &&
              <Row className="row-message-success">
                <Col className="col-message-success">
                  <p>
                    <img src={ImageSuccess} alt="img-succees" class="success-op" />
                    Se ha eliminado de tus favoritos
                  </p>
                </Col>
              </Row>
            }
            {favoriteDeleteError &&
              <Row className="row-message-success">
                <Col className="col-message-success">
                  <p>¡ups! ha ocurrido un error.</p>
                </Col>
              </Row>
            }
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
                  {!!ingredients && ingredients.length > 0 && ingredients.map((ingredient, index) =>
                    <ListGroup.Item key={index}>
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
            <div className="description-recipe" dangerouslySetInnerHTML={{ __html: description}}>
            </div>
            <Row className="row-dates-recipe">
              <Col className="user-name" sm={4}>
                <p><span>Autor:</span> {!!User && User.name}</p>
              </Col>
              <Col className="recipe-level" sm={4}>
                <p><span>Dificultad:</span> {oneRecipe.level}</p>
              </Col>
              <Col className="recipe-points" sm={4}>
                <p><span>Puntos:</span> {oneRecipe.positivePoints > 0 ? oneRecipe.positivePoints : 0}</p>
              </Col>
            </Row>
          </Container>
          <Footer />
        </>
      }
    </>
  )
}

export default ViewRecipe