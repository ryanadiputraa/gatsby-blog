import React from "react"
import { graphql, StaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from '../components/Post'
import PaginationLinks from '../components/PaginationLinks'

const IndexPage = () => {

  const postsPerPage = 5;
  let numberOfPages

  return(
    <Layout pageTitle="Home Page">
      <Helmet>
        <script src="https://kit.fontawesome.com/14ff7e2675.js" crossOrigin="anonymous"></script>
      </Helmet>
      <SEO title="Home" />
        <StaticQuery query={ indexQuery } render={ data => {
          numberOfPages = Math.ceil(data.allMarkdownRemark.totalCount / postsPerPage)
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
              <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
            </div>
          )
        } } />
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
      ) {
      totalCount  
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
                fluid(maxWidth: 600, maxHeight: 300) {
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
