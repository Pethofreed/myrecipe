import './styles.css'
import {
  changeEmail,
  changeError,
  changeName,
  changePassword,
  changePasswordConfirm,
  changeSpeciality,
} from '../../store/SignupReducer'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useDispatch, useSelector} from 'react-redux'
import { Form, Button, Container } from 'react-bootstrap'

function SignUp() {

  const history = useHistory()
  const dispatch = useDispatch()

  const {
    name,
    password,
    passwordconfirm,
    email,
    speciality,
    error } = useSelector(({SignupReducer})=> ({
    name: SignupReducer.name,
    password: SignupReducer.password,
    passwordconfirm: SignupReducer.passwordconfirm,
    email: SignupReducer.email,
    speciality: SignupReducer.speciality,
    error: SignupReducer.error,
  }))

  async function handleSubmit(e){
    e.preventDefault()
    if( password !== passwordconfirm){
      dispatch(changeError('Las contraseñas no coinciden'))
    } else {
      try {
        const { data } = await axios ({
          method: 'POST',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/users/signup',
          data: {
            name,
            password,
            email,
            speciality,
          },
        })
        localStorage.setItem('token', data.token)
        history.push('/myrecipes')
      } catch(error){
        dispatch(changeError(error.response.data.message))
      }
    }
  }

  return (
    <>
      <Container className="container-signup text-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label className="mb-0">Nombre</Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder="Tu nombre"
              onChange={(e) => {dispatch(changeName(e.target.value))}}
              value={name}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label className="mb-0">Correo</Form.Label>
            <Form.Control
              className="mb-2"
              type="email"
              placeholder="tuemail@ejemplo.com"
              onChange={(e) => {dispatch(changeEmail(e.target.value))}}
              value={email}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="mb-0">Contraseña</Form.Label>
            <Form.Control
              className="mb-2"
              type="password"
              placeholder="******"
              onChange={(e) => {dispatch(changePassword(e.target.value))}}
              value={password}
            />
          </Form.Group>
          <Form.Group controlId="passwordTwo">
            <Form.Label className="mb-0">Confirma Contraseña</Form.Label>
            <Form.Control
              className="mb-2"
              type="password"
              placeholder="******"
              onChange={(e) => {dispatch(changePasswordConfirm(e.target.value))}}
              value={passwordconfirm}
            />
          </Form.Group>
          <Form.Group controlId="speciality">
            <Form.Label className="mb-0">Especialidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo: Tacos"
              onChange={(e) => {dispatch(changeSpeciality(e.target.value))}}
              value={speciality}
            />
          </Form.Group>
          <Form.Group>
            <Form.Text className="text-muted ya-tienes-una-cuenta">
                ¿Ya tienes una cuenta? <a href="/signin"><span className="inicia-sesion-signup">Inicia Sesión</span></a>
            </Form.Text>
          </Form.Group>
          {error &&
            <Form.Group className="error-message">
              <Form.Label className="error-message">
                {error}
              </Form.Label>
          </Form.Group>
          }
          <Form.Group className="button-signup-registrar">
            <Button variant="outline-success" type="submit">
              Registrarme
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  )
}

export default SignUp
