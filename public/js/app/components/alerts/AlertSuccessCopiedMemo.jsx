import React from 'react'
import PropTypes from 'prop-types'
import UpperAlertRow from './UpperAlertRow'

const AlertSuccessCopiedMemo = ({ eventFromParams, alertMsg }) =>
  (eventFromParams && eventFromParams === 'copy' && (
    <UpperAlertRow
      alertMsg={alertMsg}
      color="danger"
      ukey="success-copied-and-updated-upper-alert"
    />
  )) ||
  null

AlertSuccessCopiedMemo.propTypes = {
  alertMsg: PropTypes.string,
  eventFromParams: PropTypes.string
}

export default AlertSuccessCopiedMemo
