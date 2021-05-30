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




    // const [checkboxValues, setCheckboxValues] = useState<Record<string, boolean>>(
    //   {},
    // )
    // const [isFiltered, setFilter] = useState<string[]>([])

    // //filters dropwdown content
    const categoryFilter = deduplicate(productList.map(product => product.category).filter(category => !!category))



    // const typeFilter = deduplicate(
    //   initialList.map(product => product.product_type),
    // )

    // //Category
    // const filterCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    //   console.log(e.target.value)
    //   if (e.target.value === 'Category') {
    //     setList(initialList)
    //   } else {
    //     const listToFilter =
    //       !isFiltered.includes('Category')
    //         ? filteredList
    //         : initialList

    //     setList(
    //       listToFilter.filter(product => product.category === e.target.value),
    //     )
    //     !isFiltered.includes('Category') &&
    //       setFilter(prev => [...prev, 'Category'])
    //   }
    // }

    // //Product type
    // const filterType = (e: ChangeEvent<HTMLSelectElement>) => {
    //   console.log(e.target.value)
    //   if (e.target.value === 'Product type') {
    //     setList(initialList)
    //   } else {
    //     const listToFilter =
    //       !isFiltered.includes('Type')
    //         ? filteredList
    //         : initialList
    //     setList(
    //       listToFilter.filter(
    //         product =>
    //           product.product_type <= e.target.value &&
    //           product.product_type >= e.target.value + 1,
    //       ),
    //     )
    //     !isFiltered.includes('Type') && setFilter(prev => [...prev, 'Type'])

    //   }
    // }
    // console.log(isFiltered)
    // //Price
    // const filterPrice = (e: ChangeEvent<HTMLSelectElement>) => {
    //   console.log(e.target.value)
    //   let sortedList: IProduct[] = []
    //   if (e.target.value === 'Ascending') {
    //     sortedList = initialList.sort((a, b) => Number(a.price) - Number(b.price))
    //     // setList(initialList.sort((a, b) => Number(a.price) - Number(b.price)))
    //   } else if (e.target.value === 'Descending') {
    //     sortedList = initialList.sort((a, b) => Number(b.price) - Number(a.price))

    //     // setList(initialList.sort((a, b) => Number(b.price) - Number(a.price)))
    //   } else if ('Default') {
    //     sortedList = initialList
    //     // setList(initialList)
    //   }
    //   console.log(sortedList)
    //   setList(sortedList)
    // }

    // //  Ratings
    // const filterRating = (rating: string) => {
    //   if (rating === 'All') {
    //     setList(initialList)
    //   }
    //   else {
    //     setList(
    //       initialList
    //         .filter(
    //           product => {
    //             if (product.rating !== null) {
    //               Math.floor(product.rating) === Number(rating)
    //             } else {
    //               return false
    //             }
    //           },
    //         ),
    //     )
    //   }
    // }

    // const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    //   console.log(e.target)
    //   setCheckboxValues({ [e.target.name]: e.target.checked })
    //   filterRating(e.target.value)
    // }

    const [category, setCategory] = useState<string>('')
    const [price, setPrice] = useState<string>('Default')



    // const filterHandler = () => {
    //   onFilterChange({
    //     search: initialFilters.search,
    //     category: category,
    //   })
    // }

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

    // return (
    //   <Section>
    //     {/* Category */}
    //     <select
    //       onChange={(e: ChangeEvent<HTMLSelectElement>) => {
    //         filterCategory(e)
    //       }}
    //     >
    //       <option selected>Category</option>
    //       {brandFilter.map(brand => (
    //         <option key={brand}>{brand}</option>
    //       ))}
    //     </select>
    //     {/* Price */}
    //     <select onChange={(e: ChangeEvent<HTMLSelectElement>) => filterPrice(e)}>
    //       <option selected>Default</option>
    //       <option>Ascending</option>
    //       <option>Descending</option>
    //     </select>

    //     {/* Type*/}
    //     <select
    //       onChange={(e: ChangeEvent<HTMLSelectElement>) => {
    //         filterType(e)
    //       }}
    //     >
    //       <option>Product type</option>
    //       {typeFilter.map(
    //         type => type.length && <option key={type}>{type}</option>,
    //       )}
    //     </select>

    //     {/* Rating*/}
    //     <label>
    //       <input
    //         key={1}
    //         type="radio"
    //         checked={checkboxValues['all']}
    //         onChange={e => {
    //           handleRatingChange(e)
    //         }}
    //         name="all"
    //         value={0}
    //       />
    //       All
    //     </label>

    //     <label>
    //       <input
    //         key={1}
    //         type="radio"
    //         checked={checkboxValues['rating1']}
    //         onChange={e => {
    //           handleRatingChange(e)
    //         }}
    //         name="rating1"
    //         value={1}
    //       />
    //       1
    //     </label>

    //     <label>
    //       <input
    //         key={2}
    //         type="radio"
    //         checked={checkboxValues['rating2']}
    //         onChange={e => {
    //           handleRatingChange(e)
    //         }}
    //         name="rating2"
    //         value={2}
    //       />
    //       2
    //     </label>

    //     <label>
    //       <input
    //         key={3}
    //         type="radio"
    //         checked={checkboxValues['rating3']}
    //         onChange={e => {
    //           handleRatingChange(e)
    //         }}
    //         name="rating3"
    //         value={3}
    //       />
    //       3
    //     </label>

    //     <label>
    //       <input
    //         key={4}
    //         type="radio"
    //         checked={checkboxValues['rating4']}
    //         onChange={e => {
    //           handleRatingChange(e)
    //         }}
    //         name="rating4"
    //         value={4}
    //       />
    //       4
    //     </label>

    //     <label>
    //       <input
    //         key={5}
    //         type="radio"
    //         checked={checkboxValues['rating5']}
    //         onChange={e => {
    //           handleRatingChange(e)
    //         }}
    //         name="rating5"
    //         value={5}
    //       />
    //       5
    //     </label>
    //   </Section >
    // )
}
