const { slugify } = require('./src/util/utilityFunctions');
const path = require('path')
const _ = require('lodash')

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if(node.internal.type === 'MarkdownRemark') {
    const slugFromTitle = slugify(node.frontmatter.title);
    createNodeField({
      node,
      name: 'slug',
      value: slugFromTitle
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const templates = {
    singlePost: path.resolve('src/templates/single-post.js'),
    tagsPage: path.resolve('src/templates/tags-page.js'),
    tagPosts: path.resolve('src/templates/tag-posts.js'),
    postList: path.resolve('src/templates/post-list.js')
  }

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {  
    if(res.errors) return Promise.reject(res.errors);

    const posts = res.data.allMarkdownRemark.edges;

    // create single blogpost pages
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          // passing slug for template to use to get post
          slug: node.fields.slug
        }       
      })
    })

    // get all tags
    let tags = []
    _.each(posts, edge => {
      if(_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })

    // example
    // ['tag1','tag2', ...]
    // {tag1: 4, tag2: 6, ...}
    let tagPostCounts = {};
    tags.forEach(tag => {
      tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1; // if no tags it will qual 0, if it has then plus 1
    })

    tags = _.uniq(tags) // eleminate all duplicate tags. ex: ['code', 'code', 'design'] => ['code', 'design']
    
    // create tags page
    createPage({
      path: `/tags`,
      component: templates.tagsPage,
      context: {
        tags, 
        tagPostCounts
      }
    })

    // create tag posts page
    tags.forEach(tag => {
      createPage({
        path: `/tag/${slugify(tag)}`,
        component: templates.tagPosts,
        context: {
          tag,
        }
      })
    })

    const postPerPage = 5;
    const numberOfPages = Math.ceil(posts.length / postPerPage);

    Array.from({ length: numberOfPages }).forEach((_, index) => {
      const isFirstPage = index === 0;
      const currentPage = index + 1;

      if(isFirstPage) return

      createPage({
        path: `/page/${currentPage}`,
        component: templates.postList,
        context: {
          limit: postPerPage,
          skip: index * postPerPage,
          currentPage,
          numberOfPages         
        }       
      })
    })
  })
}