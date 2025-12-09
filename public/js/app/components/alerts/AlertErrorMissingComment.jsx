import React from 'react'
import PropTypes from 'prop-types'
import UpperAlertRow from './UpperAlertRow'

const AlertErrorMissingComment = ({ isError = false, alertMsg = '' }) =>
  isError && <UpperAlertRow alertMsg={alertMsg} color="danger" ukey="error-if-smth-missing-upper-alert" />

AlertErrorMissingComment.propTypes = {
  alertMsg: PropTypes.string,
  isError: PropTypes.bool,
}

export default AlertErrorMissingComment
