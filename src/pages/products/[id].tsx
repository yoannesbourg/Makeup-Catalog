import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import * as React from 'react'

import { Context } from 'node:vm'
import Slider from 'react-slick'

import {
  Container,
  Image,
  Product,
  Section,
} from '../../components/Styled-Components/Styled-Components'

export const getStaticPaths = async () => {
  const res = await fetch(
    'http://makeup-api.herokuapp.com/api/v1/products.json',
  )
  const productsList: Product[] = await res.json()
  const paths = productsList.map(product => {
    return {
      params: { id: product.id.toString() },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: Context) => {
  const id = context.params.id
  const res = await fetch(
    'http://makeup-api.herokuapp.com/api/v1/products.json',
  )
  const productsList: Product[] = await res.json()
  const product = productsList.filter(product => product.id == id)
  return {
    props: { product },
  }
}

const Details = ({ product }: { product: Product[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  console.log(product[0])
  return (
    <Container>
      <Section>
        <h1>{product[0].name}</h1>
        <h2>{product[0].category}</h2>
        <h3>{product[0].price + product[0].price_sign}</h3>
      </Section>

      <Section>
        <Slider {...settings}>
          <div>
            <Image src={product[0].api_featured_image} />
          </div>
          <div>
            <Image src={product[0].api_featured_image} />
          </div>
          <div>
            <Image src={product[0].api_featured_image} />
          </div>
        </Slider>
      </Section>

      <Section>
        <p>{product[0].description}</p>
      </Section>
    </Container>
  )
}

export default Details

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
