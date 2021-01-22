import React from 'react'
import PropTypes from 'prop-types'
import UpperAlertRow from './UpperAlertRow'

const AlertSuccessRebuild = ({ alertMsg, hasBeenRebuild }) =>
  hasBeenRebuild && (
    <UpperAlertRow alertMsg={alertMsg} color="success" ukey="success-rebuild-upper-alert" />
  )

AlertSuccessRebuild.propTypes = {
  alertMsg: PropTypes.string,
  hasBeenRebuild: PropTypes.bool
}

export default AlertSuccessRebuild
