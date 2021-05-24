import {
  Button,
  Modal,
  Form,
  Row,
  Col,
} from 'react-bootstrap'
import './styles.css'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

function EditarPerfil({user, token}) {

  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [name, setName] = useState(null)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [speciality, setSpeciality] = useState(null)

  if(!!user && user.length > 0){
    setName(user.name)
    setEmail(user.email)
    setSpeciality(user.speciality)
  }

  function handleClose() {
    setShow(false)
    setPassword('')
    setName(user.name)
    setEmail(user.email)
    setConfirmPassword('')
    setSpeciality(user.speciality)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if(password !== '' && password === confirmPassword ) {
      try {
        const { data } = await axios({
          method: 'PUT',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/users/update',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          data: {
            name,
            email,
            speciality,
            password,
          }
        })
        dispatch({ type: 'SAVE_USER', payload: data.user })
        setShow(false)
      } catch(error) {
        dispatch({ type: 'USER_ERROR', payload: error})
        setShow(false)
      }
    } else {
      try {
        const { data } = await axios({
          method: 'PUT',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/users/update',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          data: {
            name,
            email,
            speciality,
          }
        })
        dispatch({ type: 'SAVE_USER', payload: data.user })
        setShow(false)
      } catch(error) {
        dispatch({ type: 'USER_ERROR', payload: error})
        setShow(false)
      }
    }
  }

  return (
    <>
      <Button onClick={e => {
        setName(user.name)
        setEmail(user.email)
        setSpeciality(user.speciality)
        setShow(true)
        }
      }>Editar Perfil</Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
            <Modal.Title>Cambiar datos de cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-2">
              <Form.Group as={Row} controlId="formPlaintextName">
                <Form.Label column sm="3">
                  Nombre
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    required
                  />
                </Col>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="3">
                  Email
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </Col>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Row} controlId="formPlaintextSpeciality">
                <Form.Label column sm="3">
                  Especialidad
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    onChange={e => setSpeciality(e.target.value)}
                    value={speciality}
                    required
                  />
                </Col>
              </Form.Group>
            </Row>
            <hr></hr>
            <Row className="mb-2">
              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="3">
                  Contraseña
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    placeholder="**********"
                  />
                </Col>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Row} controlId="formPlaintextPasswordTwo">
                <Form.Label column sm="3">
                  Confirmar
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="password"
                    onChange={e => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder="**********"
                  />
                </Col>
                {confirmPassword !== '' && password !== confirmPassword &&
                  <p class="text-center mt-2 message-no-equals">**Las contraseñas no coinciden**</p>
                }
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            type="button"
            variant="outline-primary"
            onClick={handleSubmit}
          >
            Guardar Cambios
          </Button>
          <Button onClick={handleClose} variant="outline-danger">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}

export default EditarPerfil
