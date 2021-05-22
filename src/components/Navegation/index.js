import {
  FormControl,
  Navbar,
  Button,
  Form,
  Row,
  Col,
  Nav
} from 'react-bootstrap'
import './styles.css'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import LogoNavbar from './logo_navbar.png'
import 'bootstrap/dist/css/bootstrap.min.css'

function Navigation({top}) {

  const history = useHistory()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const [show, setShow] = useState(false);
  const [searchRecipe, setSearchRecipe] = useState('')

  function handleClick() {
    dispatch({type: 'USER_LOGOUT'})
    localStorage.clear()
    history.push('/signin')
  }

  function handleClose() {
    setShow(false)
    setSearchRecipe('')
  }

  async function handleSubmitModal (e) {
    e.preventDefault()

    // if(!!emailToRecovery) {
    //   try {
    //     const { data } = await axios ({
    //       method: 'POST',
    //       baseURL: process.env.REACT_APP_SERVER_URL,
    //       url: '/users/recovery',
    //       data : {
    //         email : emailToRecovery,
    //       }
    //     })

    //     if(data.message === 'correctly') {
    //       setResult(true)
    //       setExistEmail(true)
    //     } else {
    //       setExistEmail(false)
    //     }
    //   } catch (error) {
    //     setResult(false)
    //   }
    // }

  }

  return (
    <>
      <Row>
        <Navbar bg="dark" variant="dark" fixed={top}>
          <Col xs={12} sm={4} className="d-none d-sm-block">
            <Navbar.Brand href="/" >
              <img src={LogoNavbar} alt="logo my recipe" className="logo-navbar"/>
            </Navbar.Brand>
          </Col>
          <Col className="d-none d-md-block">
            <Form inline>
              <Row>
                <Col><FormControl type="text" placeholder="¿Qué receta buscas?" className=" mr-sm-2" /></Col>
                <Col><Button type="submit">Buscar</Button></Col>
              </Row>
            </Form>
          </Col>
          <Col className="text-center">
            <Row>
              <Nav>
                <Col>
                  <Nav.Link href="/">Inicio</Nav.Link>
                </Col>
                {token && <Col>
                  <Nav.Link href="/favorites">Favoritas</Nav.Link>
                </Col>}
                {token && <Col>
                  <Nav.Link href="/myrecipes">Mis Recetas</Nav.Link>
                </Col>}
                <Col className="d-md-none">
                  <Nav.Link onClick = {e => setShow(true)}>Buscar</Nav.Link>
                </Col>
                {token && <Col>
                  <Nav.Link onClick={handleClick}>Cerrar Sesion</Nav.Link>
                </Col>}
                {!token && <Col>
                  <Nav.Link href="/signin">Iniciar Sesion</Nav.Link>
                </Col>}
                {!token && <Col>
                  <Nav.Link href="/signup">Regístrate</Nav.Link>
                </Col>}
              </Nav>
            </Row>
          </Col>
        </Navbar>
      </Row>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
            <Modal.Title>Buscar Recetas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p class="text-center">Busca recetas de tu interés y aprende a preparlas. Entonces,</p>
          <p class="text-center">¿Qué deseas preparar?</p>
          <Form>
            <Row>
              <Col xs={8}>
                <FormControl
                  id="recipeToSearch"
                  name="recipe"
                  type="text"
                  onChange={e => setSearchRecipe(e.target.value)}
                  value={searchRecipe}
                  placeholder="ejemplo: Pasteles"
                  required
                />
              </Col>
              <Col>
                <Button
                  type="button"
                  variant="outline-primary"
                  onClick={handleSubmitModal}
                >
                  Buscar
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button onClick={handleClose} variant="outline-danger">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Navigation
