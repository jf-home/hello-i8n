import React from 'react'
import Layout from '../../components/Layout'
import BlogRollEN from '../../components/BlogRollEN'
import BlogRollDE from '../../components/BlogRollDE'

export default class BlogIndexPage extends React.Component {
    render() {
    return (
      <Layout locale={this.props.pageContext.locale}>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/blog-index.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
              backgroundColor: '#f40',
              color: 'white',
              padding: '1rem',
            }}
          >
            {/*post.frontmatter.title*/}
            {this.props.pageContext.locale === "en" ? "Latest stories" : "Neueste Geschichten"}
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              {this.props.pageContext.locale === "en" ? <BlogRollEN /> : <BlogRollDE />}
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}