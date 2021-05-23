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
  const [smShow, setSmShow] = useState(false)
  const [idDelete, setIdDelete] = useState(null)
  const [alertShow, setAlertShow] = useState(false)
  const [nameDelete, setNameDelete] = useState(null)

  useEffect(() => {
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function deleteRecipe(id) {
    try {
      await axios({
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
      setIdDelete(null)
      setNameDelete(null)
      setSmShow(true)
      dispatch(getRecipes())
    } catch(error) {
      setError(error.message)
    }
  }

  return (
    <>
      {!!recipes && recipes.length > 0 && recipes.map( ({
        id,
        title,
        duration,
        level,
        positivePoints,
        picture
      }) => {
        return (
          <>
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
                    <Button variant="primary" size="sm" href={`/view/${id}`}>
                      Ver
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setIdDelete(id);
                        setAlertShow(true);
                        setNameDelete(title);
                      }}
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </>
        )
      })
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
        <Button
          variant="outline-primary"
          onClick={() => setSmShow(false)}
        >
          Ok
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal
      size="sm"
      show={alertShow}
      onHide={() => setAlertShow(false)}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header className="title-modal-delete">
        <Modal.Title id="example-modal-sizes-title-sm">
          ¿Eliminar?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="body-modal-delete">
        {nameDelete}
      </Modal.Body>
      <Modal.Footer className="btns-delete-recipies">
        <Button
          variant="outline-success"
          onClick={() => {
            deleteRecipe(idDelete);
            setAlertShow(false);
          }}
        >
          Sí
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => setAlertShow(false)}
        >
          No
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default ShowCard