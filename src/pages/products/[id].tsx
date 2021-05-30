import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Context } from 'node:vm'
import Slider from 'react-slick'
import styled from 'styled-components'

import {
  Container,
  Info,
  Price,
  Section,
  Title,
} from '../../components/Styled-Components/Styled-Components'
import { IProduct } from '../../models/Product'

export const getStaticPaths = async () => {
  const res = await fetch(
    'http://makeup-api.herokuapp.com/api/v1/products.json',
  )
  const productsList: IProduct[] = await res.json()
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
  const productsList: IProduct[] = await res.json()
  const product = productsList.filter(product => product.id == id)
  return {
    props: { product },
  }
}

const Details = ({ product }: { product: IProduct[] }) => {
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
                {product[0].api_featured_image ?
                  <ProductPageImage
                    src={product[0].api_featured_image}
                    width={'100%'}
                  />
                  : null
                }
              </div>
              <div>
                {product[0].api_featured_image ?
                  <ProductPageImage
                    src={product[0].api_featured_image}
                    width={'100%'}
                  />
                  : null
                }
              </div>
              <div>
                {product[0].api_featured_image ?
                  <ProductPageImage
                    src={product[0].api_featured_image}
                    width={'100%'}
                  />
                  : null
                }
              </div>
            </Slider>
          </LeftColumn>
          <RightColumn>
            {
              product[0].name ?
                <Title>{product[0].name}</Title>
                : null
            }

            {product[0].category ?
              <Info>{product[0].category}</Info>
              : null
            }
            {product[0].price ?
              <Price>{product[0].price + product[0].price_sign}</Price>
              : null
            }
            {product[0].description ?
              <Info>{product[0].description}</Info>
              : null
            }
          </RightColumn>
        </ProductPageLayout>
      </Section>
    </Container>
  )
}

export default Details

const ProductPageImage = styled.img`
  width: 100%;
  object-fit: cover;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`

const ProductPageLayout = styled.div`
  display: flex;
`

const LeftColumn = styled.div`
  width: 50%;
  background-color: green;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const RightColumn = styled.div`
  width: 50%;
  backgroun-color: red;
  @media (max-width: 768px) {
    width: 100%;
  }
`
