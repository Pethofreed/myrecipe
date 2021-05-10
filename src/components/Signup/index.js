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
        history.push('/profile')
      } catch(error){
        dispatch(changeError(error.message))
      }
    }
  }

  return (
    <Container className="container-signup">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tu nombre"
            onChange={(e) => {dispatch(changeName(e.target.value))}}
            value={name}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="tuemail@ejemplo.com"
            onChange={(e) => {dispatch(changeEmail(e.target.value))}}
            value={email}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="******"
            onChange={(e) => {dispatch(changePassword(e.target.value))}}
            value={password}
          />
        </Form.Group>
        <Form.Group controlId="passwordTwo">
          <Form.Label>Confirma Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="******"
            onChange={(e) => {dispatch(changePasswordConfirm(e.target.value))}}
            value={passwordconfirm}
          />
        </Form.Group>
        <Form.Group controlId="speciality">
          <Form.Label>¿Especialidad?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tacos"
            onChange={(e) => {dispatch(changeSpeciality(e.target.value))}}
            value={speciality}
          />
        </Form.Group>
        <Form.Group>
          <Form.Text className="text-muted ya-tienes-una-cuenta">
              ¿Ya tienes una cuenta? <a href="/signin"><span className="inicia-sesion-signup">Inicia Sesión</span></a>
          </Form.Text>
        </Form.Group>
        <Form.Group className="button-signup-registrar">
          <Button variant="outline-success" type="submit">
            Registrarme
          </Button>
          { error &&
            <Form.Text className="text-muted">
              {error}
            </Form.Text>
          }
        </Form.Group>
      </Form>
    </Container>
  )
}

export default SignUp
