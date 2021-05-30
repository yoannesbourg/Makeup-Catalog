import { ChangeEvent, useState } from 'react'

import { Section } from '../components/Styled-Components/Styled-Components'
import { deduplicate } from '../helpers/deduplicate'

export interface FiltersInterface {
  productList: Product[]
  setList: (newState: any) => void
  list: Product[]
}

export default function Filters({
  productList,
  setList,
  list,
}: FiltersInterface) {
  const [checkboxValues, setCheckboxValues] = useState<Record<string, boolean>>(
    {},
  )
  const [isFiltered, setFilter] = useState([''])

  //filters dropwdown content
  const brandFilter = deduplicate(productList.map(product => product.category))
  const typeFilter = deduplicate(
    productList.map(product => product.product_type),
  )

  //Category
  const filterCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    if (e.target.value === 'Category') {
      setList(productList)
    } else {
      const listToFilter =
        !isFiltered.includes('Category') && isFiltered.length > 0
          ? list
          : productList

      setList(
        listToFilter.filter(product => product.category === e.target.value),
      )
      !isFiltered.includes('Category') &&
        setFilter(prev => [...prev, 'Category'])
    }
  }

  //Product type
  const filterType = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    if (e.target.value === 'Product type') {
      setList(productList)
    } else {
      const listToFilter =
        !isFiltered.includes('Type') && isFiltered.length > 0
          ? list
          : productList
      setList(
        listToFilter.filter(
          product =>
            product.product_type <= e.target.value &&
            product.product_type >= e.target.value + 1,
        ),
      )
      !isFiltered.includes('Type') && setFilter(prev => [...prev, 'Type'])
    }
  }

  //Price
  const filterPrice = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    if (e.target.value === 'Ascending') {
      setList(productList.sort((a, b) => (a.price > b.price ? 1 : -1)))
    } else if (e.target.value === 'Descending') {
      setList(productList.sort((a, b) => (a.price < b.price ? 1 : -1)))
    } else if ('Default') {
      setList(productList)
    }
  }

  //  Ratings
  const filterRating = (rating: string) => {
    console.log(typeof rating)
    if (rating === 'All') {
      setList(productList)
    }
    setList(
      productList.filter(
        product => Math.floor(product.rating) === Number(rating),
      ),
    )
  }

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target)
    setCheckboxValues({ [e.target.name]: e.target.checked })
    filterRating(e.target.value)
  }

  return (
    <Section>
      {/* Category */}
      <select
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          filterCategory(e)
        }}
      >
        <option selected>Category</option>
        {brandFilter.map(brand => (
          <option key={brand}>{brand}</option>
        ))}
      </select>
      {/* Price */}
      <select onChange={(e: ChangeEvent<HTMLSelectElement>) => filterPrice(e)}>
        <option selected>Default</option>
        <option>Ascending</option>
        <option>Descending</option>
      </select>

      {/* Type*/}
      <select
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          filterType(e)
        }}
      >
        <option>Product type</option>
        {typeFilter.map(
          type => type.length && <option key={type}>{type}</option>,
        )}
      </select>

      {/* Rating*/}
      <label>
        <input
          key={1}
          type="radio"
          checked={checkboxValues['all']}
          onChange={e => {
            handleRatingChange(e)
          }}
          name="all"
          value={0}
        />
        All
      </label>

      <label>
        <input
          key={1}
          type="radio"
          checked={checkboxValues['rating1']}
          onChange={e => {
            handleRatingChange(e)
          }}
          name="rating1"
          value={1}
        />
        1
      </label>

      <label>
        <input
          key={2}
          type="radio"
          checked={checkboxValues['rating2']}
          onChange={e => {
            handleRatingChange(e)
          }}
          name="rating2"
          value={2}
        />
        2
      </label>

      <label>
        <input
          key={3}
          type="radio"
          checked={checkboxValues['rating3']}
          onChange={e => {
            handleRatingChange(e)
          }}
          name="rating3"
          value={3}
        />
        3
      </label>

      <label>
        <input
          key={4}
          type="radio"
          checked={checkboxValues['rating4']}
          onChange={e => {
            handleRatingChange(e)
          }}
          name="rating4"
          value={4}
        />
        4
      </label>

      <label>
        <input
          key={5}
          type="radio"
          checked={checkboxValues['rating5']}
          onChange={e => {
            handleRatingChange(e)
          }}
          name="rating5"
          value={5}
        />
        5
      </label>
    </Section>
  )
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
