import React from 'react'
import { Collapse as BootstrapCollapse } from 'reactstrap'
import PropTypes from 'prop-types'

class Collapse extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: this.props.isOpen || false,
      firstLoad: this.props.isOpen ? 'false' : 'true'
    }

    this.toggleHeader = this.toggleHeader.bind(this)
  }

  toggleHeader(event) {
    event.preventDefault()
    const isOpen = !this.state.isOpen
    this.setState({
      isOpen,
      firstLoad: 'false'
    })
    if (isOpen) this.props.onOpening()
    else this.props.onClosing()
  }

  render() {
    const { alt, buttonText, color, className, uLabel } = this.props
    const classes = `card collapsible ${color || 'blue'} ${className || ''}`

    return (
      <div className={classes}>
        <div
          className="card-header withTrigger"
          role="tab"
          tabIndex="0"
          onClick={this.toggleHeader}
          onKeyPress={this.toggleHeader}
        >
          <h4 className="mb-0 mt-0">
            <a
              href={'#' + uLabel}
              alt={alt}
              aria-expanded={this.state.isOpen}
              aria-controls={'expand-' + uLabel}
              className="title"
              data-toggle="collapse"
              load={this.state.firstLoad}
            >
              {buttonText}
            </a>
          </h4>
        </div>
        <BootstrapCollapse
          isOpen={this.state.isOpen}
          color={color}
          toggler={'expand-' + uLabel}
          aria-labelledby={'expand-' + uLabel}
        >
          <div className="card-body">{this.props.children}</div>
        </BootstrapCollapse>
      </div>
    )
  }
}

Collapse.propTypes = {
  alt: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  uLabel: PropTypes.string.isRequired
}

Collapse.defaultProps = {
  color: 'blue',
  className: ''
}

export default Collapse
