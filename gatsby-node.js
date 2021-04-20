const _ = require('lodash')
const path = require('path')
const locales = require(`./config/i18n`)
//const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')
const { localizedSlug, findKey, removeTrailingSlash, } = require(`./src/utils/gatsby-node-helpers`)

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // First delete the incoming page that was automatically created by Gatsby
  // So everything in src/pages/
  deletePage(page)

  // Grab the keys ('en' & 'de') of locales and map over them
  Object.keys(locales).map(lang => {
    // Use the values defined in "locales" to construct the path
    const localizedPath = locales[lang].default
      ? page.path
      : `${locales[lang].path}${page.path}`

    return createPage({
      // Pass on everything from the original page
      ...page,
      // Since page.path returns with a trailing slash (e.g. "/pt/")
      // We want to remove that (e.g. "pt/")
      path: removeTrailingSlash(localizedPath),
      // Pass in the locale as context to every page
      // This context also gets passed to the src/components/layout file
      // This should ensure that the locale is available on every page
      context: {
        ...page.context,
        locale: lang,
        dateFormat: locales[lang].dateFormat,
      },
    })
  })
}



exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  // Check for "MarkdownRemark" type so that other files (e.g. images) are excluded
  if (node.internal.type === `MarkdownRemark`) {
    // Use path.basename
    // https://nodejs.org/api/path.html#path_path_basename_path_ext
    // It will return the file name without '.md' string (e.g. "file-name" or "file-name.lang")
    const name = path.basename(node.fileAbsolutePath, `.md`);

    // Find the key that has "default: true" set (in this case it returns "en")
    const defaultKey = findKey(locales, o => o.default === true);

    // Check if file.name.lang has the default lang type.
    // (in this case the default language is for files set with "en")
    const isDefault = name.split(`.`)[1] === defaultKey;

    // Files are defined with "name-with-dashes.lang.md"
    // So grab the lang from that string
    // If it's the default language, pass the locale for that
    const lang = isDefault ? defaultKey : name.split(`.`)[1];

    // Get the entire file name and remove the lang of it
    const slugFileName = name.split(`.`)[0];
    // Then remove the date if the name has the date info
    //const slug = 
    //  slugFileName.length >= 10
    //    ? slugFileName.slice(11)
    //    : slugFileName;
    const slug = slugFileName

    // Adding the nodes on GraphQL for each post as "fields"
    createNodeField({ node, name: `slug`, value: slug });
    createNodeField({ node, name: `locale`, value: lang });
    createNodeField({ node, name: `isDefault`, value: isDefault });
  }
}



exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      files: allMarkdownRemark {
        edges {
          node {
            id
            fields {
              locale
              isDefault
              slug
            }
            frontmatter {
              templateKey
              tags
              title
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }


    //const posts = result.data.allMarkdownRemark.edges
    const posts = result.data.files.edges


    //posts.forEach((edge) => {
    posts.forEach(({node: file}) => {
        const id = file.id

      // Getting Slug and Title
      const slug = file.fields.slug
      const title = file.frontmatter.title

      // Use the fields created in exports.onCreateNode
      const locale = file.fields.locale
      const isDefault = file.fields.isDefault

      const isPage = file.frontmatter.templateKey != "blog-post" ? true : false

      createPage({
        path: localizedSlug({ isDefault, locale, slug, isPage }),
        tags: file.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(file.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          locale,
        },
      })
    })
  })
}