import React from 'react'
import { Alert, Row } from 'reactstrap'
import PropTypes from 'prop-types'

const UpperAlertRow = ({ alertMsg, children, color, ukey }) => (
  <Row key={ukey} className="w-100 my-0 mx-auto upper-alert">
    <Alert color={color || 'info'}>{alertMsg}</Alert>
    {children}
  </Row>
)

UpperAlertRow.propTypes = {
  alertMsg: PropTypes.string.isRequired,
  children: PropTypes.node,
  color: PropTypes.oneOf(['info', 'success', 'danger', 'warn']),
  ukey: PropTypes.string.isRequired,
}

UpperAlertRow.defaultProps = {
  children: <></>,
  color: 'info',
}

export default UpperAlertRow
