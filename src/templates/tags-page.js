import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Badge, Button, Card, CardBody } from 'reactstrap'
import { slugify } from '../util/utilityFunctions'

const tagsPage = ({ pageContext }) => {
  
  const { tags, tagPostCounts } = pageContext;

  return(
    <Layout pageTitle="All tags">
      <SEO title="All tags" keywords={['tags','topics','programming']} />
      <Card>
        <CardBody>
          <ul style={{ display: 'flex' }}>
            { tags.map(tag => (
              <li key={tag} style={{ margin: '10px' }}>
                <Button color="primary" href={`/tag/${slugify(tag)}`}>
                  { tag } <Badge color="light">{tagPostCounts[tag]}</Badge>
                </Button>
              </li>
            )) }
          </ul>
        </CardBody>
      </Card>
    </Layout>
  )
}

export default tagsPage