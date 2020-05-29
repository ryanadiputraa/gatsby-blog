import React from "react"
import { Link } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout pageTitle="Ooops, something went wrong">
    <SEO title="404: Not found" />
    <Link to="/" className="btn btn-primary text-uppercase" >Go to Home Page</Link>
  </Layout>
)

export default NotFoundPage
