import {
  Spinner,
  Button,
  Modal,
  Form,
  Row,
  Col
} from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRecipes } from '../../store/RecipesReducer'

function EditRecipe({recipes, id}) {

  const token = localStorage.getItem('token')

  const dispatch = useDispatch()
  const [camp, setCamp] = useState('')
  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('')
  const [picture, setPicture] = useState(null)
  const [duration, setDuration] = useState('')
  const [loading, setLoading] = useState(false)
  const [idToEdit, setIdToEdit] = useState(null)
  const [editShow, setEditShow] = useState(false)
  const [noSubmit, setNoSubmit] = useState(false)
  const [ingredients, setIngredients] = useState('')
  const [description, setDescription] = useState('')
  let recipeToEdit = []

  if(idToEdit){
    recipeToEdit = recipes.filter( recipe => recipe.id === idToEdit)
    setEditShow(true)
  }

  function handleClose() {
    setTitle('')
    setPicture(null)
    setEditShow(false)
    setDuration('')
    setLevel('none')
    setIngredients('')
    setDescription('')
    setNoSubmit(false)
    setLoading(false)
  }

  function handlePicture(e){
    setPicture(e.target.files)
  }

  function validator(){
    if(title === ''){
      setCamp('Titulo')
      return false
    }
    if(picture === null){
      setCamp('Imagen')
      return false
    }
    if(duration === ''){
      setCamp('Duración')
      return false
    }
    if(level === 'none'){
      setCamp('Dificultad')
      return false
    }
    if(ingredients === ''){
      setCamp('Ingredientes')
      return false
    }
    if(description === ''){
      setCamp('Receta')
      return false
    }
    return true
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(validator()){
      try{
          setLoading(true)
          const form = new FormData()
          form.append('level', level)
          form.append('title', title)
          form.append('duration', duration)
          form.append('description', description)
          form.append('ingredients', ingredients)
          form.append('picture', picture[0], picture[0].name)

        await axios({
          method: 'POST',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/recipes/create',
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        })
        recipeToEdit = []
        handleClose()
        dispatch(getRecipes())
      } catch(error){
        console.log(error)
      }
    } else {
      setNoSubmit(true)
    }
  }

  return (
    <>
      <Button variant="primary" size="sm" onClick={e => setIdToEdit(id)}>
        Editar
      </Button>
      {editShow &&
        <Form>
          <Modal
            show={editShow}
            onHide={() => setEditShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header>
              <Modal.Title id="example-modal-sizes-title-lg">
                Editar Receta
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mb-2">
                <Form.Group as={Row} controlId="formPlaintextTitle">
                  <Form.Label column sm="3">
                    Titulo
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Tortas de pollo"
                      value={title}
                    />
                  </Col>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Row} controlId="formPlaintextDuration">
                  <Form.Label column sm="3">
                    Duración
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      onChange={e => setDuration(e.target.value)}
                      placeholder="30 min"
                      value={duration}
                    />
                  </Col>
                </Form.Group>
              </Row>
              <Row  className="mb-2">
                <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                  <Form.Label column sm="3">
                    Dificultad
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      as="select"
                      onChange={e => setLevel(e.target.value)}
                    >
                      <option value="none">Seleccione un nivel</option>
                      <option value="Fácil">Fácil</option>
                      <option value="Medio">Medio</option>
                      <option value="Difícil">Difícil</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Row} controlId="formPlaintextImage">
                  <Form.Label column sm="2">
                    Imagen
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handlePicture}
                    />
                  </Col>
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group as={Row} controlId="formPlaintextIngredients">
                  <Form.Label column sm="3">
                    Ingredientes
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      onChange={e => setIngredients(e.target.value)}
                      placeholder="separe por comas: Arroz, Papa, Pollo"
                      value={ingredients}
                    />
                  </Col>
                </Form.Group>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Redacte acá su receta paso a paso"
                      onChange={e => setDescription(e.target.value)}
                      value={description}
                    />
                    {noSubmit &&
                      <p className="text-center mt-2 message-no-submit">
                        ** Te faltan campos por llenar ({camp}) **
                      </p>
                    }
                    {loading &&
                      <Row>
                        <Col className="btn-loading">
                          <Button variant="success" className="loading-message">
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            Creando . . .
                          </Button>
                        </Col>
                      </Row>
                    }
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button
                type="submit"
                variant="outline-primary"
                onClick={handleSubmit}
              >
                Crear
              </Button>
              <Button onClick={handleClose} variant="outline-danger">
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      }
    </>
  )
}

export default EditRecipe