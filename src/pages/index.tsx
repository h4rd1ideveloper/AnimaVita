import React, { useEffect } from 'react'
import Head from 'next/head'
import { Container } from '../styles/pages/Home'
import { useSelector } from 'react-redux'
import { animeParserFromState } from '../assets'

const Home: React.FC = () => {
  const { animes, links, count, ...rest } = useSelector(animeParserFromState)
  // const dispatch = useDispatch()
  useEffect(() => {
    console.log({ animes, links, count, ...rest })
  }, [])
  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>
      <header>
        <h1>AnimaVita</h1>
        <h3>Consultas online com animes e mangás</h3>
      </header>
      <main>
        <div>
          <div>
            <p>imagem do personagem</p>
          </div>
          <h4>Nome principal do personagem</h4>
          <p>Breve descrição do personagem.</p>
          <small>Outros nomes, se houver</small>
        </div>
      </main>
      <footer>
        <p><strong>Telavita 2018 Todos os direitos reservados. </strong></p>
      </footer>
    </Container>
  )
}
export default Home
