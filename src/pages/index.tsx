import { ChangeEvent, useState } from 'react'

import Link from 'next/link'

import ProductCard from '../components/ProductCard'
import Searchbar from '../components/Searchbar'
import {
  Container,
  Product,
  ProductListContainer,
  Section,
  Title,
} from '../components/Styled-Components/Styled-Components'

export default function Home({ productList }: { productList: Product[] }) {
  const [list, setList] = useState(productList)
  const [checkboxValues, setCheckboxValues] = useState<Record<string, boolean>>({})

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target)
    setCheckboxValues({ [e.target.name]: e.target.checked })
    filterRating(e.target.value)
  }

  function deduplicate<T>(array: T[]): T[] {
    const set = new Set(array)
    return [...set]
  }

  //filters
  const brandFilter = deduplicate(productList.map(product => product.category))

  const typeFilter = deduplicate(productList.map(product => product.product_type))

  const filter = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    setList(productList.filter(product => product.category === e.target.value))
  }

  const filterType = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    setList(productList.filter(product => product.product_type <= e.target.value && product.product_type >= e.target.value + 1))
  }
  const filterPrice = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    if (e.target.value === 'Ascending') {
      setList(productList.sort((a, b) => (a.price > b.price ? 1 : -1)))

    }
    else if (e.target.value === 'Descending') {
      setList(productList.sort((a, b) => (a.price < b.price ? 1 : -1)))
    }
  }


  const filterRating = (rating: string) => {
    console.log(typeof rating);

    setList(productList.filter((product) => Math.floor(product.rating) === Number(rating)))
  }

  const search = (value: string) => {
    setList(
      productList.filter(product =>
        product.name.toLowerCase().startsWith(value.toLowerCase()),
      ),
    )
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
        {/* Category */}
        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            filter(e)
          }}
        >
          {brandFilter.map(brand => (

            <option key={brand}>{brand}</option>
          ))}
        </select>
        {/* Price */}
        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>) => filterPrice(e)}
        >
          <option selected disabled>Default</option>
          <option>Ascending</option>
          <option>Descending</option>
        </select>

        {/* Type*/}
        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            filterType(e)
          }}
        >
          {typeFilter.map(type => (
            type.length &&
            <option key={type}>{type}</option>
          ))}
        </select>

        {/* Rating*/}

        <label>
          <input
            key={1}
            type="radio"
            checked={checkboxValues['rating1']}
            onChange={(e) => { handleRatingChange(e) }}
            name='rating1'
            value={1}
          />
           1
          </label>


        <label>
          <input
            key={2}
            type="radio"
            checked={checkboxValues['rating2']}
            onChange={(e) => { handleRatingChange(e) }}
            name='rating2'
            value={2}
          />
           2
          </label>


        <label>
          <input
            key={3}
            type="radio"
            checked={checkboxValues['rating3']}
            onChange={(e) => { handleRatingChange(e) }}
            name='rating3'
            value={3}
          />
           3
          </label>

        <label>
          <input
            key={4}
            type="radio"
            checked={checkboxValues['rating4']}
            onChange={(e) => { handleRatingChange(e) }}
            name='rating4'
            value={4}
          />
           4
          </label>

        <label>
          <input
            key={5}
            type="radio"
            checked={checkboxValues['rating5']}
            onChange={(e) => { handleRatingChange(e) }}
            name='rating5'
            value={5}
          />
           5
          </label>


      </Section>

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
