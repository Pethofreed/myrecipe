import axios from 'axios'
import {
  ListGroupItem,
  ListGroup,
  Button,
  Modal,
  Card,
  Row,
  Col
} from 'react-bootstrap'
import './styles.css'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getRecipes } from '../../store/RecipesReducer'


function ShowCard({recipes, token}) {

  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [smShow, setSmShow] = useState(false);

  useEffect(() => {
    setSmShow(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSmShow])

  async function deleteRecipe(id) {
    let opcion = window.confirm('¿Desea eliminar esta receta?')
    if(opcion) {
      try {
        const { data } = await axios({
          method: 'PUT',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/recipes/delete',
          data: {
            id,
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setSmShow(true)
        dispatch(getRecipes())
      } catch(error) {
        setError(error.message)
      }
    }
  }

  return (
    <>
      {!!recipes && recipes.length > 0 ? recipes.map( ({
        id,
        title,
        duration,
        level,
        positivePoints,
        picture
      }) => {
        return (
          <Col class="card-individual d-flex">
            <Card
              className="card-myrecipes"
              key={id}
            >
              <Card.Img
                variant="top"
                src={picture}
                alt="imagen de receta"
              />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Dificultad: {level}</ListGroupItem>
                <ListGroupItem>Duración: {duration}</ListGroupItem>
                <ListGroupItem>Puntos: {positivePoints > 0 ? positivePoints : 0}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Row>
                  <Col className="btns-card">
                    <Button variant="primary" size="sm">
                      Ver
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={e => deleteRecipe(id)}
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        )
      }) :
      <p>Aun no ha creado ninguna receta.</p>
    }

    <Modal
      size="sm"
      show={smShow}
      onHide={() => setSmShow(false)}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-sm">
          ¡Eliminado!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Su receta se eliminó correctamente.</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setSmShow(false)}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default ShowCard