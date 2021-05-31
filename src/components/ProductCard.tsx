import styled from 'styled-components'

import { IProduct } from '../models/Product'

const ProductCard = (product: IProduct) => {
  if (!product) {
    return null
  }
  return (
    <Wrapper>
      {product.api_featured_image && <Image src={product.api_featured_image} />}
      <Overlay>
        {product.category && <Category>{product.category}</Category>}
      </Overlay>
      <div>
        {product.name && <Title>{product.name}</Title>}

        {product.rating && <Info>Rating: {product.rating}</Info>}
        <Price>{product.price ? product.price : '0.0'} €</Price>
      </div>
    </Wrapper>
  )
}

export default ProductCard

const Title = styled.h3`
  font-family: Roboto, sans-serif;
  font-size: 24px;
  font-weight: 300;
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

const Category = styled.p`
  color: white;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  text-align: center;
  margin: 8px 0 0 0;
  background-color: palevioletred;
  border-radius: 4px;
  padding: 4px;
`

const Price = styled.p`
  font-size: 24px;
  text-align: center;
  color: palevioletred;
  margin: 8px 0 0 0;
`

const Image = styled.img`
  width: 280px;
  height: 280px;
  objet-fit: cover;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 32px;
  transition: 0.5s ease;
`

const Wrapper = styled.div`
  margin: 24px 24px 0 0;
  width: 320px;
  height: 400px;
  position: relative;
`
