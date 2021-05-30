import { useState } from 'react'

import Link from 'next/link'

import ProductCard from '../components/ProductCard'
import Searchbar from '../components/Searchbar'
import Filters from '../components/Filters'
import {
  Container,
  Product,
  ProductListContainer,
  Section,
  Title,
} from '../components/Styled-Components/Styled-Components'

export default function Home({ productList }: { productList: Product[] }) {
  const [list, setList] = useState(productList)
  const search = (value: string) => {

    setList(
      productList.filter(product =>
        product.name.toLowerCase().startsWith(value.toLowerCase()),
      ),
    )

  }

  const handleState = (newState: any) => {
    setList(newState)
  }

  return (
    <Container>
      <Section>
        <Title>Makeup</Title>
      </Section>

      <Section>
        <Searchbar handleSearch={search} />
      </Section>

      <Filters productList={productList} setList={handleState} list={list} />

      <ProductListContainer>
        {list.map(product => {
          return (
            <Link href={`/products/${product.id}`} key={product.id}>
              <a>
                <ProductCard {...product} />
              </a>
            </Link>
          )
        })}
      </ProductListContainer>
    </Container>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(
    'http://makeup-api.herokuapp.com/api/v1/products.json',
  )
  const productList: Product[] = await res.json()

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
  rating: number
  tag_list?: string[]
  updated_at: string
  website_link: string
}
