import React from 'react'
import PropTypes from 'prop-types'
import i18n from '../../../../../i18n'
import UpperAlertRow from './UpperAlertRow'

const AlertDraftOfPublished = ({ userLangIndex }) => {
  const { alerts } = i18n.messages[userLangIndex]

  return <UpperAlertRow alertMsg={alerts.infoAboutFreshData || ''} ukey="infoAboutNewData"></UpperAlertRow>
}

AlertDraftOfPublished.propTypes = {
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
}

export default AlertDraftOfPublished
