import {
  Container,
  Spinner,
  Button,
  Alert
} from 'react-bootstrap'
import './styles.css'
import { useState, useEffect } from 'react'
import Navigation from "../../components/Navegation"
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from '../../store/AllRecipesReducer'
import LandingCard from '../../components/LandingCards'


export function LandingPage() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllRecipes())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const {  AllRecipes, loading, error } = useSelector(({
    AllRecipesReducer
  }) => ({
    loading: AllRecipesReducer.loading,
    error: AllRecipesReducer.error,
    AllRecipes: AllRecipesReducer.allRecipes
  }))

  return(
    <>
      <Navigation top="top"/>
      <Container className="container-landing d-flex">
        <div className="contenedor-dos">
          {loading &&
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
          }
          {error &&
            <Alert variant="danger">
            lo sentimos, hubo un error al cargar la información.
          </Alert>
          }
          <LandingCard allRecipes={AllRecipes} />
        </div>
      </Container>
    </>
  )
}