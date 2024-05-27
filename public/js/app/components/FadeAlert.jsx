import React from 'react'
import { Fade } from 'reactstrap'
import Alert from '../components-shared/Alert'

/**
 * FadeAlert is a wrapper around Alert (components-shared/Alert)
 * with fade feature from reactstrap added.
 */
const FadeAlert = ({ isOpen, ...alertProps }) => (
  <Fade unmountOnExit in={isOpen}>
    <Alert {...alertProps} />
  </Fade>
)

export default FadeAlert
