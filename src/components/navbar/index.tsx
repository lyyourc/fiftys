import React from 'react'
import styled from '@/styled'
import { NavLink as Link } from 'react-router-dom'

const routes = [
  { name: 'Home', to: '/', exact: true },
  { name: 'FQA', to: '/fqa' },
]

export default function Navbar() {
  return (
    <Nav>
      {routes.map(({ name, ...rest }) => (
        <NavItem key={name}>
          <Link {...rest}>{name}</Link>
        </NavItem>
      ))}
    </Nav>
  )
}

const Nav = styled('nav')`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${props => props.theme.heights.navbar};
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 0 20px;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  border: 2px solid #41403e;
  background: #fff;
`

const NavItem = styled('div')`
  display: flex;
  align-items: center;
  padding: 0 40px;

  & a {
    color: #41403e;
    text-decoration: none;
    border-bottom: 5px solid #41403e;
    border-bottom-left-radius: 15px 3px;
    border-bottom-right-radius: 15px 5px;
    padding-bottom: 0.1rem;

    &.active {
      border-color: ${props => props.theme.colors.accent};
    }
  }
`
