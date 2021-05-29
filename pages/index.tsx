import { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import ProductCard from '../components/ProductCard'
import Searchbar from '../components/Searchbar'

export default function Home({ productList }: { productList: Product[] }) {

  const [list, setList] = useState(productList)


  function deduplicate<T>(array: T[]): T[] {
    const set = new Set(array)
    return [...set]
  }

  //filters
  const brandFilter = deduplicate(productList.map(product => product.category))


  const filter = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setList(productList.filter(product => product.category === e.target.value))
  }
  const filterPrice = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setList(productList.sort((a, b) => (a.price > b.price ? 1 : -1)))
  }

  const search = (value: string) => {

    setList(productList.filter(product => product.name.toLowerCase().startsWith(value.toLowerCase())))
  }

  return (
    <Container>
      <Section>
        <Title>Makeup</Title>
      </Section>

      <Section>
        <Searchbar handleSearch={search} />
      </Section>

      <Section>
        <select onChange={(e) => filter(e)}>
          {brandFilter.map(brand => <option>{brand}</option>)}
        </select>
        <select onChange={(e) => filterPrice(e)}>
          <option>Ascending</option>
          <option>Descending</option>
        </select>
      </Section>

      <ProductListContainer>
        {list.map(product => {
          return (
            <>
              <ProductCard {...product} />
            </>

          )
        })}
      </ProductListContainer>

    </Container>
  )
}
const Container = styled.div`
  width: 90%;
  text-align: center;
  margin: 0 auto;
`

const Section = styled.section`
  margin-top: 36px;
`

const Title = styled.h1`
  color: #505050;
  font-size: 48px;
  font-family: Roboto, sans-serif;
`

const ProductListContainer = styled.div`
  margin-top: 36px;
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Product = styled.div`
background-color: #ff000024;
`
export const getStaticProps = async () => {
  const res = await fetch(
    'http://makeup-api.herokuapp.com/api/v1/products.json',
  )
  const productList: any[] = await res.json()

  return {
    props: {
      productList,
    },
  }
}

export interface Product {
  api_featured_image: string
  brand: string
  category: string
  created_at: string
  currency: string
  description: string
  id: number
  image_link: string
  name: string
  price: string
  price_sign: string
  product_api_url: string
  product_colors?: {
    colour_name: string
    hex_value: string
  }[]
  product_link: string
  product_type: string
  rating: null
  tag_list?: string[]
  updated_at: string
  website_link: string
}