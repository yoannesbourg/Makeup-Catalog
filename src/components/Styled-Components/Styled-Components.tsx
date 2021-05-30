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
