import styled from 'styled-components'

export const Container = styled.div`
  width: 90%;
  text-align: center;
  margin: 0 auto;
`

export const Section = styled.section`
  margin-top: 36px;
`

export const Title = styled.h1`
  color: #505050;
  font-size: 48px;
  font-family: Roboto, sans-serif;
`

export const ProductListContainer = styled.div`
  margin-top: 36px;
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Product = styled.div`
  background-color: #ff000024;
`

export const Image = styled.img`
    width: 280px;
    height: 280px;
    objet-fit: cover;
}
`
export const Info = styled.p`
  color: #505050;
  font-family: Roboto, sans-serif;
  font-size: 1.2em;
  text-align: center;
  margin: 8px 0 0 0;
`

export const Price = styled.p`
  font-size: 1em;
  text-align: center;
  color: palevioletred;
  margin: 8px 0 0 0;
`


export const Wrapper = styled.div`
  margin: 24px 16px 0 0;
  max-width: 320px;
`