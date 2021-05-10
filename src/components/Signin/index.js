import './styles.css'
import axios from 'axios'
import { Form,
  Button,
  Container
} from 'react-bootstrap'
import { useHistory } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useDispatch, useSelector} from "react-redux"
import { changeEmail, changePassword, changeError } from "../../store/SigninReducer"

function SignIn() {

  const history = useHistory()
  const dispatch = useDispatch()

  const {
    email,
    password,
    error } = useSelector(({SigninReducer}) => ({
      email: SigninReducer.email,
      password: SigninReducer.password,
      error: SigninReducer.error,
  }))

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const { data } = await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users/signin',
        data: {
          email,
          password,
        }
      })

      localStorage.setItem('token', data.token)
      history.push('/profile')
    } catch(error){
      dispatch(changeError())
    }
  }

  return (
    <Container className="container-signin">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) => dispatch(changeEmail(e.target.value))}
            value={email}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => dispatch(changePassword(e.target.value))}
            value={password}
          />
        </Form.Group>
        {error &&
          <Form.Group className="error-message">
            <Form.Label className="error-message">
              {error}
            </Form.Label>
        </Form.Group>
        }
        <Form.Group className="button-signin-entrar">
          <Button
            variant="outline-success"
            type="submit"
          >
            Iniciar Sesión
          </Button>
        </Form.Group>
        <Form.Group>
          <Form.Text className="text-muted no-tienes-una-cuenta">
              ¿No tienes una cuenta? <a href="/signup"><span className="registrate-signin">Registrarme</span></a>
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default SignIn
