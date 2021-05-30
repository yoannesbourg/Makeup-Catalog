import styled from 'styled-components'
import { IProduct } from '../models/Product'

const ProductCard = (product: IProduct) => {
  if (!product) {
    return null
  }

  return (
    <Wrapper>
      <Image src={product.api_featured_image} />
      <div>
        <Title>{product.name}</Title>
        <Info>
          <strong>{product.category}</strong>
        </Info>
        <Info>{product.brand}</Info>
        <Info>{product.product_type}</Info>
        <Info>{product.rating || null}</Info>
        <Price>
          {product.price || '0.0'},{product.price_sign}
        </Price>
      </div>
    </Wrapper>
  )
}

export default ProductCard
const Title = styled.h3`
  font-family: Roboto, sans-serif;
  font-size: 1.6em;
  text-align: center;
  color: palevioletred;
  margin: 16px 0 0 0;
`

const Info = styled.p`
  color: #505050;
  font-family: Roboto, sans-serif;
  font-size: 1.2em;
  text-align: center;
  margin: 8px 0 0 0;
`

const Price = styled.p`
  font-size: 1em;
  text-align: center;
  color: palevioletred;
  margin: 8px 0 0 0;
`

const Image = styled.img`
    width: 280px;
    height: 280px;
    objet-fit: cover;
}
`

const Wrapper = styled.div`
  margin: 24px 16px 0 0;
  max-width: 320px;
`