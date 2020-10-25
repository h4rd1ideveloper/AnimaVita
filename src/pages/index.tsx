/* eslint-disable camelcase */
import React, { useEffect } from 'react'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { charactersParserFromState, partialDataInterface } from '../assets'
import { hydrate } from '../store/actions'
import { characterInterface } from '../types'
import style from '../styles/style.module.css'
import {
  Alert,
  Button,
  Col,
  Container,
  Navbar,
  NavbarBrand,
  NavbarText,
  Row,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap'

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const {
    characters,
    links: { first, last, next, prev }
  }: partialDataInterface = useSelector(charactersParserFromState)
  const _isLoading = useSelector(state => state._isLoading)
  useEffect(() => {
    if (characters.length === 0) {
      dispatch(
        hydrate(
          'https://kitsu.io/api/edge/characters?page[limit]=4&page[offset]=0'
        )
      )
    }
  }, [])

  function changePageByUrl(url: string) {
    return e => {
      e.preventDefault()
      dispatch(hydrate(url))
    }
  }

  return (
    (!!_isLoading && <div className={style.spinner} />) || (
      <>
        <Head>
          <title>Homepage</title>
        </Head>
        <Navbar color="light" light expand="md" className="mb-5">
          <Container>
            <NavbarBrand href="/">AnimaVita</NavbarBrand>
            <NavbarText>Consultas online com animes e mangás</NavbarText>
          </Container>
        </Navbar>
        <Container>
          <main className={style.main}>
            {!_isLoading && characters.length === 0 && (
              <Alert className="h-100 w-100 d-flex justify-content-center align-items-center">
                Os dados desta pagina estão incompletos, tente as proximas
                paginas
              </Alert>
            )}
            <Row>
              {characters?.map(
                (
                  { description, image_url, name, name_jp }: characterInterface,
                  index
                ) => (
                  <Col className="mb-4" sx="12" md="6" lg="4" key={index}>
                    <Card className=" h-100">
                      <CardImg top width="100%" src={image_url} alt={name} />
                      <CardBody>
                        <CardTitle>{name}</CardTitle>
                        <CardSubtitle>{name_jp}</CardSubtitle>
                        <CardText>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: `${description.slice(0, 320)} ...`
                            }}
                          />
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                )
              )}
            </Row>
          </main>
          <Row className="mb-5">
            {!!first && (
              <Col xs="12" md="3" className="mr-auto">
                <Button block onClick={changePageByUrl(first)}>
                  Inicio
                </Button>
              </Col>
            )}
            {!!prev && (
              <Col xs="12" md="3" className="mx-auto">
                <Button block onClick={changePageByUrl(prev)}>
                  Anterior
                </Button>
              </Col>
            )}
            {!!next && (
              <Col xs="12" md="3" className="mx-auto">
                <Button block onClick={changePageByUrl(next)}>
                  Proxima
                </Button>
              </Col>
            )}
            {!!last && (
              <Col xs="12" md="3" className="ml-auto">
                <Button
                  block
                  className="ml-auto"
                  onClick={changePageByUrl(last)}
                >
                  Ultima
                </Button>
              </Col>
            )}
          </Row>
          <footer>
            <p>
              <strong>
                Telavita 2020 Todos os direitos reservados. @h4rd1ideveloper (
                <a href="mailto:policarpo@ice.ufjf.br">Yan Santos Policarpo </a>
                )
              </strong>
            </p>
          </footer>
        </Container>
      </>
    )
  )
}
export default Home
