import React from "react"
import Helmet from "react-helmet"
import { Link } from "gatsby"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { FaTwitter, FaGithub, FaDev, FaRegSun, FaRegMoon } from 'react-icons/fa';
import { TiChevronLeftOutline } from 'react-icons/ti';
import Switch from "react-switch";


import { rhythm, scale } from "../utils/typography"

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
            <TiChevronLeftOutline 
              style={{
                color: `var(--mustard)`,
                fontSize: `.7em`,
              }}
            />
            {` `} {title} 
          </Link>
        </h3>
      )
    }
  }
  
  render() {
    const { children, social, location } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;

    return (
      <div
        style={{
          color: 'var(--textNormal)',
          background: 'var(--bg)',
          transition: 'color 0.2s ease-out, background 0.2s ease-out',
          minHeight: '100vh',
        }}
      >
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
                <label              
                  style={{
                    alignSelf: `flex-start`,
                    marginTop: location.pathname === rootPath ? `.4em` : `0`
                  }}
                >
                  <Helmet
                    meta={[
                      {
                        name: 'theme-color',
                        content: theme === 'light' ? 'var(--mustard)' : 'var(--dark)',
                      },
                    ]}
                  />
                  <Switch 
                    onChange={checked => toggleTheme(checked ? 'dark' : 'light')}
                    checked={theme === 'dark'}
                    offColor={`#222`}
                    onColor={`#ce9f31`}
                    handleDiameter={25.3}
                    uncheckedIcon={
                      <FaRegSun
                        style={{
                          fontSize: `1.2em`,
                          color: `white`,
                          margin: `.225em .35em .225em .225em`
                        }}
                      />
                    }
                    checkedIcon={
                      <FaRegMoon 
                        style={{
                          fontSize: `1.2em`,
                          color: `white`,
                          margin: `.225em .225em .225em .35em`
                        }}
                      />
                    }
                    activeBoxShadow={`0 0 2px 2px #ce9f31`}
                    id={`ng-switch-checkbox`}
                    aria-label="Switch between Dark and Light mode"
                  />        
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
                href={`${social.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter
                  style={{ 
                    pointerEvents: 'none', 
                    margin: '0',
                    height: '24px',
                    width: '24px',
                    color: 'var(--textNormal)'
                  }}
                  alt="Twitter Logo"
                />
                
              </a>
              <a
                style={{ 
                  boxShadow: 'none', 
                  marginRight: '.5rem', 
                  height: '24px', 
                  display: 'block' 
                }}
                href={`${social.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub
                  style={{ 
                    pointerEvents: 'none', 
                    margin: '0',
                    height: '24px',
                    width: '24px',
                    color: 'var(--textNormal)'
                  }}
                  alt="Twitter Logo"
                />
              </a>
              <a
                style={{ 
                  boxShadow: 'none', 
                  // marginRight: '.5rem', 
                  height: '24px', 
                  display: 'block' 
                }}
                href={`${social.dev}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDev
                  style={{ 
                    pointerEvents: 'none', 
                    margin: '0',
                    height: '24px',
                    width: '24px',
                    color: 'var(--textNormal)'
                  }}
                  alt="Twitter Logo"
                />
              </a>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

export default Layout
