import React from "react"
import { graphql, StaticQuery } from 'gatsby'
import { Row, Col } from 'reactstrap'
import { Helmet } from 'react-helmet'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from '../components/Post'
import Sidebar from '../components/Sidebar'

const IndexPage = () => (
  <Layout>
    <Helmet>
      <script src="https://kit.fontawesome.com/14ff7e2675.js" crossOrigin="anonymous"></script>
    </Helmet>
    <SEO title="Home" />
    <h1>Home Page</h1>
    <Row>
      <Col md="8" >
      <StaticQuery query={ indexQuery } render={ data => {
        return (
          <div>
            { data.allMarkdownRemark.edges.map(({ node }) => (
              <Post 
                key={ node.id }
                title={ node.frontmatter.title }
                date={ node.frontmatter.date }
                author={ node.frontmatter.author }
                slug={ node.fields.slug }
                body={ node.excerpt }
                fluid={ node.frontmatter.image.childImageSharp.fluid }
                tags={ node.frontmatter.tags }
              />
            )) }
          </div>
        )
      } } />
      </Col>
      <Col md="4" >
        <Sidebar />
      </Col>
    </Row>
  </Layout>
)

const indexQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            tags
            image {
              childImageSharp{
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
              slug
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
