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
  Info
} from '../components/Styled-Components/Styled-Components'
import { IFilters } from '../models/Filters'
import { IProduct } from '../models/Product'

export default function Home({ productList }: { productList: IProduct[] }) {
  if (!productList) {
    return null
  }
  const [list, setList] = useState(productList)
  const [filters, setLfilters] = useState<IFilters>({
    search: '',
    category: false,
    price: false,
    product_type: false,
    rating: false,
  })

  const search = (value: string) => {
    setLfilters(prevFilters => ({
      ...prevFilters,
      search: value.toLowerCase(),
    }))
  }

  useEffect(() => {
    if (productList.length) {
      const filteredList = productList
        .filter(product => product.name.toLowerCase().includes(filters.search))
        .sort((a, b) =>
          filters.price
            ? Number(a.price) - Number(b.price)
            : Number(b.price) - Number(a.price),
        )
        .filter(product =>
          !filters.category ? product : product.category === filters.category,
        )
        .filter(product =>
          !filters.product_type
            ? product
            : product.product_type === filters.product_type,
        )
        .filter(product =>
          !filters.rating ? product : product.rating === filters.rating,
        )

      setList(filteredList)
    }
  }, [filters])

  const handleFilterChanges = (filters: IFilters) => {
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

      <Filters
        onFilterChange={handleFilterChanges}
        initialFilters={filters}
        productList={productList}
      />

      <Section>
        <Info>Products ({list.length})</Info>
      </Section>

      <ProductListContainer>
        {list.map(product => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <a style={{ textDecoration: "none" }}>
              <ProductCard {...product} />
            </a>
          </Link>
        ))}
      </ProductListContainer>
    </Container >
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
