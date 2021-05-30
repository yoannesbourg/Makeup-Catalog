import { useEffect, useState } from 'react'

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
import { IFilters } from '../models/Filters'

export default function Home({ productList }: { productList: IProduct[] }) {
  const [list, setList] = useState(productList)
  const [filters, setLfilters] = useState({
    search: "",
    category: '',
    price: 'Default'
  })


  const search = (value: string) => {

    setLfilters(prevFilters => ({
      ...prevFilters,
      search: value.toLowerCase()
    }))
  }





  useEffect(() => {
    const filteredList = productList
      .filter(product =>
        product.name.toLowerCase().includes(filters.search),
      )
      .filter(product => product.category === filters.category)
      .sort((a, b) => Number(b.price) - Number(a.price))
    // .filter(searchFilter)
    // .filter(searchFilter)
    // .filter(searchFilter)

    setList(filteredList)
  }, [filters])

  const handleFilterChanges = (filters: IFilters) => {
    console.log(filters)
    setLfilters(filters)

  }

  return (
    <Container>
      <Section>
        <Title>Makeup</Title>
      </Section>

      <Section>
        <Searchbar handleSearch={search} />
      </Section>

      {/* <Filters productList={productList} setList={handleState} list={list} /> */}
      <Filters onFilterChange={handleFilterChanges} initialFilters={filters} productList={productList} />

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
