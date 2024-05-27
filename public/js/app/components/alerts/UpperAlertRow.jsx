import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../../components-shared/Alert'
import { legacyAlertColorToType } from '../../util/legacyAlertColorToType'

const UpperAlertRow = ({ alertMsg, color }) => {
  const alertType = legacyAlertColorToType(color) || 'info'
  return (
    <Alert className="upper-alert" type={alertType}>
      {alertMsg}
    </Alert>
  )
}

UpperAlertRow.propTypes = {
  alertMsg: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['info', 'success', 'danger', 'warn']),
}

UpperAlertRow.defaultProps = {
  color: 'info',
}

export default UpperAlertRow
