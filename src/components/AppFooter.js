import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://www.eafc-uccle.be/" target="_blank" rel="noopener noreferrer">
          EAFC Uccle
        </a>
        <span className="ms-1">&copy; 2021-2022 Projet d&apos;integration de développement</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Developed by</span>
        <a
          href="https://github.com/WalidBoussaid/FabLabProject"
          target="_blank"
          rel="noopener noreferrer"
        >
          Walid
        </a>
        &
        <a
          href="https://github.com/ruthadorable/FabLabProject"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ruth Ann
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
