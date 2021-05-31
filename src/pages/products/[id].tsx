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
    fallback: true,
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
  if (!product) {
    return null
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  console.log(product)
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
              <Price>{product[0].price + ' €'}</Price>
              : null
            }
            {product[0].description ?
              <Info>{product[0].description}</Info>
              : null
            }
            <Section>

              {product[0].product_colors?.length ?
                (<>
                  <Info>Available colors</Info>
                  {product[0].product_colors.map(color => (
                    <ProductColor color={color.hex_value} />
                  ))}
                </>)
                : null
              }
            </Section>
          </RightColumn>
        </ProductPageLayout>
      </Section>
    </Container>
  )
}

export default Details

const ProductColor = styled.div`
  width: 40px;
  height: 40px;
  margin-top: 16px;
  background-color: ${props => props.color};
`

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
  height: 100vh;
  align-items: center;
  @media (max-width: 768px) {
   flex-direction: column;
  }
`

const LeftColumn = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
    width: 50%;
    @media (max-width: 768px) {
      width: 100%;
    }
  `
