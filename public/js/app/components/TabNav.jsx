import React from 'react'
import PropTypes from 'prop-types'

const TabNav = ({ activeTabId, onClick, sections, sectionsLabels }) => (
  <div className="tab-bar-container row">
    <div className="col">
      <ul className="nav nav-tabs sectionsTabNav" role="tablist">
        {sections.map(({ id }) => (
          <li className="nav-item" key={'header-' + id}>
            <a
              className={`nav-link ${activeTabId === id ? 'active' : ''}`}
              id={id + '-tab'}
              data-toggle="tab"
              href={`#section-header-${id}`}
              role="tab"
              aria-controls={id}
              aria-selected={activeTabId === id}
              onClick={event => {
                event.preventDefault()
                onClick(id)
              }}
            >
              {sectionsLabels[id]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
TabNav.propTypes = {
  activeTabId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.arrayOf(PropTypes.string),
      extraHeaderTitle: PropTypes.string,
    })
  ).isRequired,
  sectionsLabels: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default TabNav
