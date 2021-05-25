import {
  Container,
  Spinner,
  Button,
  Image,
  Modal,
  Form,
  Row,
  Col
} from 'react-bootstrap'
import './styles.css'
import axios from 'axios'
import draftToHtml from 'draftjs-to-html'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { useState, useEffect } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import Draft from 'draft-js'

function EditRecipe({oneRecipe, loading, error}) {

  const {EditorState, ContentState, convertFromHTML, convertToRaw} = Draft
  const descriptionOne = `${oneRecipe.description}`
  const blocksFromHTML = convertFromHTML(descriptionOne)
  const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  )

  useEffect(() => {
    setTitle(oneRecipe.title)
    setLevel(oneRecipe.level)
    setDuration(oneRecipe.duration)
    setIngredients(oneRecipe.ingredients)
    setId(oneRecipe.id)
  },[])

  const token = localStorage.getItem('token')

  const dispatch = useDispatch()
  const history = useHistory()
  const [id, setId] = useState(null)
  const [file, setFile] = useState('')
  const [camp, setCamp] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [level, setLevel] = useState('')
  const [smShow, setSmShow] = useState(false)
  const [picture, setPicture] = useState(null)
  const [duration, setDuration] = useState('')
  const [noSubmit, setNoSubmit] = useState(false)
  const [ingredients, setIngredients] = useState('')
  const [description, setDescription] = useState('')
  const [contentState, setContentState] = useState()
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [editorState, setEditorState] = useState(EditorState.createWithContent(content))
  let text = draftToHtml(convertToRaw(editorState.getCurrentContent()))

  function onEditorStateChange (editorState) {
    setEditorState(editorState)
  }

  function handleChangeImage(e) {
    readFile(e.target.files[0])
    setFile(e.target.files)
  }

  function readFile(file) {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = e => setImage(e.target.result)
    reader.onerror = e => console.log(reader.error)

  }


  function validator(){
    if(title === ''){
      setCamp('Titulo')
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
    if(text === ''){
      setCamp('Receta')
      return false
    }
    return true
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(validator()){
      if(file){
        try{
          setLoadingSubmit(true)
          const form = new FormData()
          form.append('id', id)
          form.append('level', level)
          form.append('title', title)
          form.append('duration', duration)
          form.append('description', text)
          form.append('ingredients', ingredients)
          form.append('picture', file[0], file[0].name)

          await axios({
            method: 'PUT',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: '/recipes/update_with_picture',
            data: form,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          })
          setSmShow(true)
        } catch(error){
          console.log(error)
        }
      } else {
        try{
          setLoadingSubmit(true)
          const form = new FormData()
          form.append('id', id)
          form.append('level', level)
          form.append('title', title)
          form.append('duration', duration)
          form.append('description', text)
          form.append('ingredients', ingredients)

          await axios({
            method: 'PUT',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: '/recipes/update',
            data: form,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            }
          })
          setSmShow(true)
        } catch(error){
          console.log(error)
        }
      }
    } else {
      setNoSubmit(true)
    }
  }

  function updated(){
    setSmShow(false)
    history.push(`/view/${id}`)
  }


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
      {!loading && oneRecipe &&
        <Container className="container-edit">
          <Row>
            <Col md={6}>
              <Col>
                {file === '' ?
                  <Image
                  src={oneRecipe.picture}
                  alt="foto de la receta"
                  className="img-edit"
                />  :
                <Image
                  src={image}
                  alt="foto de la receta"
                  className="img-edit"
                />
                }
                <Col className="mt-3 mb-3">
                  <Form.Group as={Row} controlId="formPlaintextImage">
                    <Form.Label column xs="4">
                     <p className="label-input">EXAMINAR</p>
                    </Form.Label>
                    <Col xs="4">
                      <Form.Control
                        className="input-file"
                        type="file"
                        accept="image/*"
                        onChange={handleChangeImage}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Col>
            </Col>
            <Col>
              <Col className="mb-3">
                <Form.Group as={Row} controlId="formPlaintextTitle">
                  <Form.Label column sm="3">
                    TÍTULO
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      onChange={e => setTitle(e.target.value)}
                      value={title}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col className="mb-3">
                <Form.Group as={Row} controlId="formPlaintextDuration">
                  <Form.Label column sm="3">
                    DURACIÓN
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      onChange={e => setDuration(e.target.value)}
                      value={duration}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                  <Form.Label column sm="3">
                    DIFICULTAD
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      as="select"
                      onChange={e => setLevel(e.target.value)}
                    >
                      {level === 'Fácil' &&
                        <><option value={level}>{level}</option>
                          <option value="Medio">Medio</option>
                          <option value="Difícil">Difícil</option>
                        </>
                      }
                      {level === 'Medio' &&
                        <>
                          <option value={level}>{level}</option>
                          <option value="Fácil">Fácil</option>
                          <option value="Difícil">Difícil</option>
                        </>
                      }
                      {level === 'Difícil' &&
                        <>
                          <option value={level}>{level}</option>
                          <option value="Fácil">Fácil</option>
                          <option value="Medio">Medio</option>
                        </>
                      }
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col className="mt-3">
              <Form.Group controlId="formPlaintextDuration">
                <Form.Label>
                  <h5>Ingredientes</h5>
                </Form.Label>
                <Col>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={ingredients}
                  onChange={e => setIngredients(e.target.value)}
                />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Col className="text-center mt-5">
                  <Form.Label>
                    <h5>Paso a paso</h5>
                  </Form.Label>
                </Col>
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={onEditorStateChange}
                />
                {noSubmit &&
                  <p class="text-center mt-5 message-no-submit">
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
          <Row className="mt-5">
            <Col className="mt-3" sm={6}>
            <Button variant="success" onClick={handleSubmit}>Guardar Cambios</Button>
            </Col>
            <Col className="mt-3" sm={6}>
              <Button variant="danger" href={`/view/${id}`}>Cancelar</Button>
            </Col>
          </Row>
        </Container>
      }

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
        <Modal.Body>Su receta se editó correctamente.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={e => updated()}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditRecipe