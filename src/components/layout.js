import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"
import twitterLogo from "../assets/color-theme/twitter-logo.png"
import githubLogo from "../assets/color-theme/github-logo.png"
import devLogo from "../assets/color-theme/dev-logo.png"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.3),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            &#x2039; {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          Side by Side © {new Date().getFullYear()}
          <div style={{ float: 'right', display: 'flex', flexDirection: 'row' }}>
            <a
              style={{ 
                boxShadow: 'none', 
                marginRight: '.5rem', 
                height: '24px', 
                display: 'block' 
              }}
              href="https://mobile.twitter.com/mhSangar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="Twitter Logo"
                src={twitterLogo}
                width="24"
                height="24"
                role="presentation"
                style={{ pointerEvents: 'none', margin: '0' }}
              />
            </a>
            <a
              style={{ 
                boxShadow: 'none', 
                marginRight: '.5rem', 
                height: '24px', 
                display: 'block' 
              }}
              href="https://github.com/mhSangar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="Github Logo"
                src={githubLogo}
                width="24"
                height="24"
                role="presentation"
                style={{ pointerEvents: 'none', margin: '0' }}
              />
            </a>
            <a
              style={{ 
                boxShadow: 'none', 
                // marginRight: '.5rem', 
                height: '24px', 
                display: 'block' 
              }}
              href="https://dev.to/mhSangar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="DEV Logo"
                src={devLogo}
                width="24"
                height="24"
                role="presentation"
                style={{ pointerEvents: 'none', margin: '0' }}
              />
            </a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Layout
