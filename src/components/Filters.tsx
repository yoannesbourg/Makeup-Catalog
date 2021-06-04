import { ChangeEvent, useState } from 'react'

import styled from 'styled-components'

import { Section } from '../components/Styled-Components/Styled-Components'
import { deduplicate } from '../helpers/deduplicate'
import { IFilters } from '../models/Filters'
import { IProduct } from '../models/Product'

interface FiltersInterface {
  initialFilters: IFilters
  onFilterChange: (filters: IFilters) => void
  productList: IProduct[]
}

export default function Filters({
  initialFilters,
  onFilterChange,
  productList,
}: FiltersInterface) {
  const [category, setCategory] = useState(initialFilters.category)
  const [price, setPrice] = useState(initialFilters.price)
  const [type, setType] = useState(initialFilters.product_type)
  const [rating, setRating] = useState(initialFilters.rating)

  const categoryFilter = deduplicate(
    productList.map(product => product.category).filter(category => !!category),
  )
  const typeFilter = deduplicate(
    productList.map(product => product.product_type),
  ).filter(category => !!category)
  const ratings = deduplicate(
    productList
      .filter(product => !!product.rating)
      .map(product => Math.floor(product.rating))
      .sort(),
  )

  const categoryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const categoryFilter =
      e.target.value === 'All categories' ? false : e.target.value

    setCategory(e.target.value)
    onFilterChange({
      search: initialFilters.search,
      category: categoryFilter,
      price: price,
      product_type: type,
      rating: rating,
    })
  }

  const priceHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const priceOrder = e.target.value === 'Ascending' ? true : false
    setPrice(priceOrder)
    onFilterChange({
      search: initialFilters.search,
      category: category,
      price: priceOrder,
      product_type: type,
      rating: rating,
    })
  }

  const typeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const typeFilter =
      e.target.value === 'All products type' ? false : e.target.value
    setType(e.target.value)
    onFilterChange({
      search: initialFilters.search,
      category: category,
      price: price,
      product_type: typeFilter,
      rating: rating,
    })
  }

  const ratingHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const ratingFilter =
      e.target.value === 'All ratings' ? false : Number(e.target.value)
    setRating(Number(e.target.value))
    onFilterChange({
      search: initialFilters.search,
      category: category,
      price: price,
      product_type: type,
      rating: ratingFilter,
    })
  }

  return (
    <Section>
      <Dropdown onChange={categoryHandler}>
        <option selected>All categories</option>
        {categoryFilter.map((brand, i) => (
          <option key={i}>{brand}</option>
        ))}
      </Dropdown>

      <Dropdown
        onChange={(e: ChangeEvent<HTMLSelectElement>) => priceHandler(e)}
      >
        <option>Ascending</option>
        <option selected>Descending</option>
      </Dropdown>

      <Dropdown
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          typeHandler(e)
        }}
      >
        <option>All products type</option>
        {typeFilter.map((type, i) => (
          <option key={i}>{type}</option>
        ))}
      </Dropdown>

      <Dropdown
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          ratingHandler(e)
        }}
      >
        <option selected>All ratings</option>
        {ratings.map(rating => (
          <option key={rating}>{rating}</option>
        ))}
      </Dropdown>
    </Section>
  )
}

const Dropdown = styled.select`
  padding: 16px;
  margin-right: 16px;
  border-radius: 8px;
  border-color: rgba(0, 0, 0, 0.1);
`
