import {
  ListGroupItem,
  ListGroup,
  Button,
  Card,
  Row,
  Col
} from 'react-bootstrap'
import './styles.css'

function FavoriteCard({recipes}) {

  return (
    <>
      {!!recipes && recipes.length > 0 && recipes.map( ({
        id,
        User,
        level,
        title,
        picture,
        duration,
        positivePoints
      }) => {
        return (
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
              <ListGroupItem>Autor: {User.name}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Row className="btn-card-landing">
                <Col className="btn-card">
                  <Button variant="primary" size="sm" href={`/view/${id}`}>
                    Ver
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )
      })
    }
  </>
  )
}

export default FavoriteCard