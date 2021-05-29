import { Context } from 'node:vm'

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
    console.log(product[0])
    return (
        <div>
            <h1>{product[0].name}</h1>
            <h2>{product[0].category}</h2>
            <p>{product[0].description}</p>
            <img src={product[0].api_featured_image} />
            <h3>{product[0].price + product[0].price_sign}</h3>
        </div>
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