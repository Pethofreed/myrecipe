import {
  Spinner,
  Button,
  Modal,
  Form,
  Row,
  Col
} from 'react-bootstrap'
import './styles.css'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import { getRecipes } from '../../store/RecipesReducer'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

function CreateRecipe({token}) {

  const dispatch = useDispatch()
  const [camp, setCamp] = useState('')
  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('')
  const [show, setShow] = useState(false)
  const [smShow, setSmShow] = useState(false)
  const [picture, setPicture] = useState(null)
  const [duration, setDuration] = useState('')
  const [loading, setLoading] = useState(false)
  const [noSubmit, setNoSubmit] = useState(false)
  const [ingredients, setIngredients] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  let text = draftToHtml(convertToRaw(editorState.getCurrentContent()))

  function handleClose() {
    setTitle('')
    setPicture(null)
    setShow(false)
    setDuration('')
    setLevel('none')
    setIngredients('')
    setNoSubmit(false)
    setLoading(false)
    setEditorState(EditorState.createEmpty())
  }

  function handlePicture(e){
    setPicture(e.target.files)
  }

  function onEditorStateChange (editorState) {
    setEditorState(editorState)
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
    if(draftToHtml(convertToRaw(editorState.getCurrentContent())) === <p></p>){
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
          form.append('description', text)
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
        setSmShow(true)
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
      <Button onClick={() => setShow(true)}>Crear Receta</Button>
      <Form>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-lg">
              Crear Receta
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
            <hr></hr>
            <Row>
              <Col>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Col className="text-center">
                    <Form.Label>
                      <h4>Redacte su receta</h4>
                    </Form.Label>
                  </Col>
                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={onEditorStateChange}
                  />
                  {noSubmit &&
                    <p class="text-center mt-2 message-no-submit">
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

      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">
            ¡Completado!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Su receta se creó correctamente.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={() => setSmShow(false)}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}

export default CreateRecipe
