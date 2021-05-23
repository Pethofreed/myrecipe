import {
  Row,
  Col
} from 'react-bootstrap'
import Github from './github.png'
import Logo from './logoFooter.png'
import Youtube from './youtube.png'
import Linkedin from './linkedin.png'
import Instagram from './instagram.png'
import './styles.css'

function Footer() {
  
  return (
    <Row className="row-footer">
      <Col className="column-one">
        <Col>@2020</Col>
        <Col>PROYECTO INDIVIDUAL</Col>
        <Col>
          <a href="/">
            <img
              src={Logo}
              alt="img logo myrecipe"
              className="image-logo-footer"
            />
          </a>
        </Col>
      </Col>
      <Col>
        <Col className="column-two">
          <a href="https://makeitreal.camp/"  target="_blank" rel="noreferrer">
            <img
              src="https://foro.makeitreal.camp/uploads/default/original/1X/f2a40ad52b937b52c2427e1a942e38304df8c4c0.png"
              alt="Make It Real"
              className="image-mir-footer"
            />
          </a>
        </Col>
        <Col>TOP-V8</Col>
      </Col>
      <Col className="column-three">
        <a href="https://github.com/Pethofreed" target="_blank" rel="noreferrer">
          <img src={Github} alt="logo-github" className="icon-red-social" />
        </a>
        <a href="https://www.linkedin.com/in/carlosvalenciahenao/" target="_blank" rel="noreferrer">
          <img src={Linkedin} alt="logo-linkedin" className="icon-red-social"/>
        </a>
        <a href="https://www.instagram.com/kingcharlie94/" target="_blank" rel="noreferrer">
          <img src={Instagram} alt="logo-instagram" className="icon-red-social-instagram"/>
        </a>
        <a href="https://www.youtube.com/channel/UCcMkIwFJxNth6-VXTzOMoWg/videos" target="_blank" rel="noreferrer">
          <img src={Youtube} alt="logo-youtube" className="icon-red-social"/>
        </a>
      </Col>
    </Row>
  )
}

export default Footer