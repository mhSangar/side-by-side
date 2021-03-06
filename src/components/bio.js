/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */


import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"
// import { foo } from "../../content/data/foo.yaml"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            purestake
            twitter
            github
            dev
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        alignItems: `center`,
        marginBottom: 0,
        marginTop: rhythm(2),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 80,
          minHeight: 80,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      {/* <p>{ foo.bar }</p> */}
      <p 
        style={{
          margin: 0,
        }}
      >
        Personal blog by <strong>{author}</strong>
        <br />
        <span style={{
          fontSize: `0.9em`,
          fontStyle: `italic`
        }}>
          Masters degree in Computer Science and DevOps engineer at{` `}
          <a target="_blank" rel="noopener noreferrer" href={`${social.purestake}`}>
            @PureStake
          </a>.{` `}
          Join me discovering new technologies and learning about random stuff.
          <br />
        </span>
        <span>
          Follow me on{` `}

          <a target="_blank" rel="noopener noreferrer" href={`${social.twitter}`}>
            Twitter
          </a>

          ,{` `}

          <a target="_blank" rel="noopener noreferrer" href={`${social.github}`}>
            GitHub
          </a>

          {` `}and{` `}

          <a target="_blank" rel="noopener noreferrer" href={`${social.dev}`}>
            DEV
          </a>
          !
        </span>

      </p>
    </div>
  )
}

export default Bio
