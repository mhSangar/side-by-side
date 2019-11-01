import React from "react"
import { Link } from "gatsby"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

import { rhythm, scale } from "../utils/typography"
import twitterLogo from "../assets/color-theme/twitter-logo.png"
import githubLogo from "../assets/color-theme/github-logo.png"
import devLogo from "../assets/color-theme/dev-logo.png"

class Layout extends React.Component {

  renderHeader() {
    const { location, title } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;

    if (location.pathname === rootPath) {
      return (
        <h1
          style={{
            ...scale(0.9),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `var(--textTitle)`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      return (
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
              color: `var(--textTitle)`,
            }}
            to={`/`}
          >
            &#x2039; {title}
          </Link>
        </h3>
      )
    }
  }
  
  render() {
    const { children } = this.props;

    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2.625rem',
          }}
        >
          {this.renderHeader()}
          <ThemeToggler>
            {({ theme, toggleTheme }) => (
              <label>
                <input
                  type="checkbox"
                  onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                  checked={theme === 'dark'}
                />{' '}
                Dark mode
              </label>
            )}
          </ThemeToggler>
        </header>
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
