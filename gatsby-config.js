require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: `Eagle Elementary School`,
    description: `This is a template elementary school site I created which targets progressive school environments becoming more socially distanced.`,
    author: `Matthew R Banks`,
    image: `https://raw.githubusercontent.com/mattrbanks/school-site-chat-survey-portfolio-project/master/src/images/eagle-elementary-school.jpg`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Rufina`,
          `serif`, // you can also specify font weights and styles
        ],
        display: "block",
      },
    },
    {
      resolve: `gatsby-source-mongodb`,
      options: { dbName: `local`, collection: `documents` },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/cuteEagleCartoonSchool2.webp`, // This path is relative to the root of the site.
      },
    },
  ],
}
