import PropTypes from 'prop-types'
import React from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import { useParams } from 'react-router-dom'

const DocsExample = (props) => {
  const { children, href, matchId, isMatchCreator } = props
  const params = useParams();

  return (
    <div className="example">
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink href={"#/event/" + matchId} active={!params['*'].includes('config')}>
            Participantes
          </CNavLink>
        </CNavItem>
        {isMatchCreator? <CNavItem>
          <CNavLink href={"#/event/config/" + matchId} active={params['*'].includes('config')}>
            Configuração
          </CNavLink>
        </CNavItem> : <></>}
      </CNav>
      <CTabContent className="rounded-bottom">
        <CTabPane className="p-3 preview" visible>
          {children}
        </CTabPane>
      </CTabContent>
    </div>
  )
}

DocsExample.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
}

export default React.memo(DocsExample)
