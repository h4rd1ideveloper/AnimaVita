import React, {useEffect} from 'react'
import Head from 'next/head'
import {GetStaticProps, InferGetStaticPropsType} from 'next'
import RocketseatLogo from '../assets/rocketseat.svg'
import {Container} from '../styles/pages/Home'
import {usePersistedState} from "../hooks";

type Anime = {
  image_url: string,
  description: string,
  name: string,
  name_jp: string
}
export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    'https://kitsu.io/api/edge/characters?page[limit]=4&page[offset]=0',
    {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    }
  )

  const {data, meta: {count}, links} = await res.json()
  console.log(data[0].attributes)
  const animes: Anime[] = data
    .map(
      ({
         attributes: {
           image: {original: image_url},
           description,
           name,
           names: {ja_jp: name_jp}
         }
       }) => ({
        image_url,
        description,
        name,
        name_jp
      }))
  return {
    props: {
      animes,
      count,
      links
    },
    revalidate: 5
  }
}
type Props = {
  animes: Anime,
  links: {
    first: string,
    next: string,
    last: string
  },
  count: Number
}
const Home: React.FC = ({animes, links, count}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [state, setState] = usePersistedState<Props>('state', {animes, count, links})
  useEffect(() => console.log(state))
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
        <div >
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
      <RocketseatLogo/>

    </Container>
  )
}
export default Home
