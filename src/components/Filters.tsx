import { ChangeEvent, useState } from 'react'

import { Section } from '../components/Styled-Components/Styled-Components'
import { deduplicate } from '../helpers/deduplicate'
import { IProduct } from '../models/Product'
import { IFilters } from '../models/Filters'
import { EEXIST } from 'node:constants'

export interface FiltersInterface {
  initialFilters: IFilters,
  onFilterChange: (filters: IFilters) => void,
  productList: IProduct[]
}

export default function Filters({
  initialFilters,
  onFilterChange,
  productList
}: FiltersInterface) {

  const [category, setCategory] = useState<string>('')
  const [price, setPrice] = useState<string>('Default')

  const categoryFilter = deduplicate(productList.map(product => product.category).filter(category => !!category))

  const categoryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
    onFilterChange({
      search: initialFilters.search,
      category: e.target.value,
      price: price
    })
  }

  const priceHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPrice(e.target.value)
    onFilterChange({
      search: initialFilters.search,
      category: category,
      price: e.target.value
    })
  }



  return (
    <Section>
      <select
        onChange={categoryHandler}
      >
        <option selected>Category</option>
        {categoryFilter.map(brand => (
          <option key={brand}>{brand}</option>
        ))}
      </select>

      <select onChange={(e: ChangeEvent<HTMLSelectElement>) => priceHandler(e)}>
        <option selected>Default</option>
        <option>Ascending</option>
        <option>Descending</option>
      </select>


    </Section>
  )

}
