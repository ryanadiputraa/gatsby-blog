import React from 'react'
import { Link } from 'gatsby'
import { Card, CardTitle, CardSubtitle, CardBody, CardText, Badge } from 'reactstrap'
import Img from 'gatsby-image' 
import { slugify } from '../util/utilityFunctions'

const Post = ({ title, date, author, slug, body, fluid, tags }) => {
  return(
    <Card>
      <Link to={ slug } >
        <Img className="card-image-top" fluid={ fluid } />
      </Link>
      <CardBody>
        <CardTitle><Link to={ slug }>{ title }</Link></CardTitle>
        <CardSubtitle>
          <span className="text-info">{ date }</span>
        </CardSubtitle>
        <CardText>{ body }</CardText>
        <ul className="post-tags">
          { tags.map(tag => (
            <li key={tag}>
              <Link to={`/tag/${slugify(tag)}`} >
                <Badge color="primary">{ tag }</Badge>
              </Link>
            </li>
          )) }
        </ul>
        <Link to={slug} className="btn btn-outline-primary float-right">Read more</Link>
      </CardBody>
    </Card>
  )
}

export default Post