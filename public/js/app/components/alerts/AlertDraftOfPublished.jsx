import React from 'react'
import { Alert } from 'reactstrap'
import PropTypes from 'prop-types'
import { ActionModalButton } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import axios from 'axios'
import i18n from '../../../../../i18n'
import { SERVICE_URL } from '../../util/constants'
import UpperAlertRow from './UpperAlertRow'

const AlertDraftOfPublished = ({ courseCode, memoEndPoint, memoVersion, publishDate, onAlert, userLangIndex }) => {
  const { actionModals, alerts } = i18n.messages[userLangIndex]

  const rebuildDraftOfPublished = async () => {
    try {
      const resultAfterDelete = await axios.delete(`${SERVICE_URL.API}draft-to-remove/${courseCode}/${memoEndPoint}`)
      if (resultAfterDelete.status >= 400) {
        onAlert('errWhileDeleting', 'danger')

        return 'ERROR-' + resultAfterDelete.status
      }

      const body = { memoEndPoint }
      const newDraftUrl = `${SERVICE_URL.API}create-draft/${courseCode}/${memoEndPoint}`

      const newResult = await axios.post(newDraftUrl, body)
      if (newResult.status >= 400) {
        onAlert('errWhileSaving', 'danger')
        return 'ERROR-' + newResult.status
      }
      const thisUrl = `${SERVICE_URL.courseMemoAdmin}${courseCode}/${memoEndPoint}?action=rebuild`
      window.location = thisUrl
    } catch (err) {
      onAlert('errWhileDeleting', 'danger')

      if (err.response) {
        throw new Error(err.message)
      }
      throw err
    }
  }

  return <UpperAlertRow alertMsg={alerts.infoAboutFreshData || ''} ukey="infoAboutNewData"></UpperAlertRow>
}

AlertDraftOfPublished.propTypes = {
  courseCode: PropTypes.string.isRequired,
  memoEndPoint: PropTypes.string.isRequired,
  memoVersion: PropTypes.number.isRequired,
  onAlert: PropTypes.func.isRequired,
  publishDate: PropTypes.string.isRequired,
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
}

export default AlertDraftOfPublished
