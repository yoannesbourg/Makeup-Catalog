import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styled from 'styled-components'

import { Context } from 'node:vm'

import Slider from 'react-slick'

import {
  Title,
  Container,
  Product,
  Section,
  Info,
  Price
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

const getStaticProps = async (context: Context) => {
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

  return (
    <Container>

      <Section>
        <ProductPageLayout>
          <LeftColumn>
            <Slider {...settings}>
              <div>
                <img src={product[0].api_featured_image} />
              </div>
              <div>
                <img src={product[0].api_featured_image} />
              </div>
              <div>
                <img src={product[0].api_featured_image} />
              </div>
            </Slider>
          </LeftColumn>
          <RightColumn>
            <Title>{product[0].name}</Title>
            <Info>{product[0].category}</Info>
            <Price>{product[0].price + product[0].price_sign}</Price>
            <Info>{product[0].description}</Info>
          </RightColumn>
        </ProductPageLayout>
      </Section>

    </Container>
  )
}

export default Details

const ProductPageLayout = styled.div`

`

const LeftColumn = styled.div`

  background-color: green;
`
const RightColumn = styled.div`

  backgroun-color: red;
`
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
