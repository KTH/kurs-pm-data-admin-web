import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import i18n from '../../../../../i18n'
import { SERVICE_URL } from '../../util/constants'
import UpperAlertRow from './UpperAlertRow'

const AlertMissingDraft = ({ courseCode, langAbbr, langIndex }) => {
  const startPageUrl = `${SERVICE_URL.aboutCourseAdmin}${courseCode}`
  const title = i18n.messages[langIndex].messages.main_site_name
  const alertMsg =
    langAbbr === 'en' ? (
      <>
        <h3>No draft version is found</h3>
        <p>This memo has no active draft because it was published, or deleted, or not created yet.</p>
        <p>
          Try to go to <a href={startPageUrl}>{title}</a> to start over.
        </p>
      </>
    ) : (
      <>
        <h3>No draft version is found</h3>
        <p>This memo has no active draft because it was published, or deleted, or not created yet.</p>
        <p>
          Try to go to <a href={startPageUrl}>{title}</a> to start over.
        </p>
      </>
    )

  return (
    <Container className="kip-container" fluid>
      <UpperAlertRow alertMsg={alertMsg} color="danger" ukey="error-missing-memo-draft" />
    </Container>
  )
}
AlertMissingDraft.propTypes = {
  courseCode: PropTypes.string,
  langAbbr: PropTypes.oneOf(['sv', 'en']),
  langIndex: PropTypes.oneOf([1, 0]),
}

AlertMissingDraft.defaultProps = {
  courseCode: '',
  langAbbr: 'sv',
  langIndex: 0,
}

export default AlertMissingDraft
