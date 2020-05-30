import React from "react"
import { Card, CardBody, CardTitle, CardText, Row } from 'reactstrap'

import Layout from "../components/layout"
import SEO from "../components/seo"
import authors from '../util/authors'
import RyanImage from '../images/icon.png'

const AboutPage = () => (
  <Layout pageTitle="About Page">
    <SEO title="About" />
    <Row className="mb-4">
      <div className="col-md-4">
        <img src={RyanImage} style={{ width: '100%' }} alt="Ryan Adi Putra" />
      </div>
      <div className="col-md-8">
        <Card style={{ minHeight: '100%' }}>
          <CardBody>
            <CardTitle>{ authors[0].name }</CardTitle>
            <CardText>{ authors[0].bio }</CardText>
          </CardBody>
        </Card>
      </div>
    </Row>
  </Layout>
)

export default AboutPage
