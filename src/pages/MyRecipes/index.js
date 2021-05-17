import {
  OverlayTrigger,
  ListGroup,
  Container,
  Tooltip,
  Card,
  Row,
  Col,
  Form
} from 'react-bootstrap'
import './styles.css'
import axios from 'axios'
import EditIcon from './edit.png'
import AcceptIcon from './accept.png'
import CancelIcon from './cancel.png'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ShowCard from '../../components/ShowCard'
import { getUser } from '../../store/UserReducer'
import Navigation from '../../components/Navegation'
import EditProfile from '../../components/EditProfile'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes } from '../../store/RecipesReducer'
import CreateRecipe from '../../components/CreateRecipe'

export function MyRecipes() {

  const dispatch = useDispatch()
  const [file, setFile ] = useState(null)
  const [image, setImage ] = useState(null)
  const [error, setError ] = useState(null)

  const token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(getUser())
    dispatch(getRecipes())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, EditProfile, CreateRecipe])

  const { user, recipes } = useSelector(({
    UserReducer, RecipesReducer
  }) => ({
    user: UserReducer.user,
    recipes: RecipesReducer.recipes
  }))

  function hadleChangeImage(e) {
    readFile(e.target.files[0])
    setFile(e.target.files)
  }

  function cancelCharge(){
    setFile(null)
    setImage(null)
  }

  const points = () => {
    let totalPoints = 0
    recipes.forEach(recipe =>{
      totalPoints += recipe.positivePoints
    })
    return totalPoints
  }

  function readFile(file) {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = e => setImage(e.target.result)
    reader.onerror = e => console.log(reader.error)

  }

  async function submitPicture(e) {
    e.preventDefault()
    const form = new FormData()
    if(file) {
      form.append('profilePicture', file[0], file[0].name)
    }

    try {
      const { data } = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/updatePicture',
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      })
      setFile(data.profilePicture)
      setFile(null)
    } catch(error) {
      setError(error.message)
    }
  }

  return(
    <>
    <Row className="header-profile">
      <Col>
        <Navigation top="none"/>
      </Col>
    </Row>
    <Row className="header-profile mt-3">
      <Col>
        <Row class="alinear-items-top">
          <Col>
            <Card
              border="primary"
              bg="light"
              text="dark"
              style={{ width: '18rem' }}
              className="mb-2"
            >
            <Card.Header
              className="text-center"
            >
              <Row>
                <Col>
                  {user.name}
                </Col>
                <Col sm={3}>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        Cambiar foto
                      </Tooltip>
                    }
                    style={{
                      backgroundColor: 'rgba(255, 100, 100, 0.85)',
                      padding: '2px 10px',
                      color: 'white',
                      borderRadius: 3,
                    }}
                  >
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>
                          {file === null  &&
                            <img
                              src={EditIcon}
                              width="49%"
                              className="edit-photo"
                              alt="Icono de cambiar foto"
                            />
                          }
                        </Form.Label>
                        <Form.Control
                          type="file"
                          className="input-file"
                          accept="image/*"
                          onChange={hadleChangeImage}
                        />
                        {!!file  &&
                          <>
                            <img
                              src={AcceptIcon}
                              width="48%"
                              className="edit-photo"
                              onClick={submitPicture}
                              alt="Icono de aceptar foto"
                            />
                            <img
                              src={CancelIcon}
                              width="44%"
                              className="cancel-photo"
                              onClick={cancelCharge}
                              alt="Icono de cancelar foto"
                            />
                          </>
                        }
                      </Form.Group>
                    </Form>
                  </OverlayTrigger>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="p-0">
              {user.picture === null && image === null && <p class="text-center mt-2">Suba su foto de perfil</p>}
              {user.picture && image === null && <img src={user.picture} width="100%" alt="foto de perfil"/>}
              {image && <img src={image} alt="Profile Preview" width="100%" />}
            </Card.Body>
          </Card>
        </Col>
        <Col className="datos-perfil">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>Recetas : #{recipes.length}</ListGroup.Item>
              <ListGroup.Item>Especialidad : {user.speciality}</ListGroup.Item>
              <ListGroup.Item>Puntos : {points() > 0 ? points() : 0}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        </Row>
      </Col>
      <Col  className="d-none d-sm-block">
        <Row>
          <Col className="btn-edit-profile m-2">
            <EditProfile user={user} token={token} />
          </Col>
          <Col>
            <CreateRecipe token={token} />
          </Col>
        </Row>
      </Col>
    </Row>
    <Container>
      <Row  className="container-cards" >
        <ShowCard recipes={recipes} token={token}/>
      </Row>
    </Container>
    </>
  )
}
