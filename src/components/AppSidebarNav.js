import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'
import { CNavItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilFootball, cilTennisBall, cilBasketball } from '@coreui/icons'
import { UilVolleyball,UilBasketball,UilTennisBall,UilFootball   } from '@iconscout/react-unicons'

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
        icon = <UilFootball class='icon-nav'/>
        break;
      case "VOLLEYBALL":
        icon = <UilVolleyball class='icon-nav'/>
        break;
      case "BEACH_TENNIS":
        icon = <UilFootball class='icon-nav'/>
        break;
      case "BASKETBALL":
        icon = <UilBasketball class='icon-nav'/>
        break;
      case "HANDBALL":
        icon = <UilFootball class="icon-nav" />
        break;
      case "TENNIS":
        icon = <UilTennisBall class='icon-nav'/>
        break;
      default:
        icon = <UilFootball class='icon-nav'/>
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
