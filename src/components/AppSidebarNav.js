import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'
import { CNavItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilFootball, cilTennisBall, cilBasketball } from '@coreui/icons'

export const AppSidebarNav = ({ items }) => {
  const location = useLocation()
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const getIconBySport = (item) => {
    let icon;
    switch (item.sport) {
      case "SOCCER":
        icon = <CIcon icon={cilFootball} customClassName="nav-icon" />
        break;
      case "VOLLEYBALL":
        icon = <CIcon icon={cilFootball} customClassName="nav-icon" />
        break;
      case "BEACH_TENNIS":
        icon = <CIcon icon={cilFootball} customClassName="nav-icon" />
        break;
      case "BASKETBALL":
        icon = <CIcon icon={cilBasketball} customClassName="nav-icon" />
        break;
      case "HANDBALL":
        icon = <CIcon icon={cilFootball} customClassName="nav-icon" />
        break;
      case "TENNIS":
        icon = <CIcon icon={cilTennisBall} customClassName="nav-icon" />
        break;
      default:
        icon = <CIcon icon={cilFootball} customClassName="nav-icon" />
    }
    return icon;
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = CNavItem
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, getIconBySport(item), badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items?.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
