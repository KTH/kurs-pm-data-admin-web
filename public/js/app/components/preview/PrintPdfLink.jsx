import React from 'react'
import { FaPrint } from 'react-icons/fa'

//
import { ActionModalButton } from '@kth/kth-kip-style-react-components'

const pdfLink = (labels) => (
  <span id="print-link-with-modal">
    <h4>{labels.courseMemoPrint}</h4>
    <ActionModalButton
      type="actionLink"
      modalId="print-link"
      btnLabel={labels.courseMemoPrint}
      modalLabels={{
        header: labels.courseMemoPrint,
        body: labels.courseMemoModal,
        btnClose: labels.btnCloseModal
      }}
    />
    <FaPrint className="pdf-icon" />
  </span>
)

export default pdfLink
