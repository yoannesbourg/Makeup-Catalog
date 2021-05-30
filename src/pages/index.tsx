import { useState } from 'react'

import Link from 'next/link'

import Filters from '../components/Filters'
import ProductCard from '../components/ProductCard'
import Searchbar from '../components/Searchbar'
import {
  Container,
  ProductListContainer,
  Section,
  Title,
} from '../components/Styled-Components/Styled-Components'

import { IProduct } from '../models/Product'

export default function Home({ productList }: { productList: IProduct[] }) {
  const [list, setList] = useState(productList)

  const search = (value: string) => {
    setList(
      productList.filter(product =>
        product.name.toLowerCase().startsWith(value.toLowerCase()),
      ),
    )
  }

  const handleState = (newState: IProduct[]) => {
    console.log(newState)
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
        {list.map(product => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <a>
              <ProductCard {...product} />
            </a>
          </Link>
        ))}
      </ProductListContainer>
    </Container>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(
    'http://makeup-api.herokuapp.com/api/v1/products.json',
  )
  const productList: IProduct[] = await res.json()

  return {
    props: {
      productList,
    },
  }
}
