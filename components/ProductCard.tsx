import Link from 'next/link'
import styled from 'styled-components'


const ProductCard = (product: Product) => {
    if (!product) {
        return null
    }

    return (
        <Link href={`/products/${product.id}`}>
            <Wrapper>
                <Image src={product.api_featured_image} />
                <div>
                    <Title>{product.category}</Title>
                    {product.brand}
                    {product.product_type}
                    <Price>
                        {product.price},{product.price_sign}
                    </Price>

                </div>
            </Wrapper>
        </Link>
    )
}

export default ProductCard
const Title = styled.h3`
  font-size: 1.6em;
  text-align: center;
  color: palevioletred;
  margin: 16px 0 0 0;
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