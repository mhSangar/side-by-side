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

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
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
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        Personal blog by <strong>{author}</strong>
        <br></br>
        I'm a developer who loves to {` `}
        <span style={{ fontStyle: 'italic' }}>waste</span> {` `}
        his time. Exactly, I should be doing anything 
        else but this blog right now. Sorry, future me.
        <br></br>
        <span>
          Follow me on{` `}
          
          <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/${social.twitter}`}>
            Twitter
          </a> 

          ,{` `} 

          <a target="_blank" rel="noopener noreferrer" href={`https://github.com/${social.github}`}>
            GitHub
          </a> 
          
          {` `}and{` `} 

          <a target="_blank" rel="noopener noreferrer" href={`https://dev.to/${social.dev}`}>
            DEV
          </a> 
          !
        </span>
        
      </p>
    </div>
  )
}

export default Bio
