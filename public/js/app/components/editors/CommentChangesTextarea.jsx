import React from 'react'
import PropTypes from 'prop-types'
import { FaAsterisk } from 'react-icons/fa'
import { Form, FormGroup, Label, Input } from 'reactstrap'

import { ContentHead } from '../ContentHead'

const CommentChangesTextarea = ({ isError, labels, memoLangIndex, onChange, textAboutChanges, userLangIndex }) => (
  <>
    <Form className={isError ? 'error-area' : ''}>
      <FormGroup>
        <ContentHead contentId="commentAboutMadeChanges" memoLangIndex={memoLangIndex} userLangIndex={userLangIndex} />
        <Label className="form-control-label" htmlFor="commentChanges">
          {labels.commentChanges}
        </Label>
        <Input
          className="form-control"
          type="textarea"
          name="text"
          id="commentChanges"
          onChange={onChange}
          defaultValue={textAboutChanges}
        />
      </FormGroup>
    </Form>
    <span data-testid="text-about-changes" className={isError ? 'error-label' : ''}>
      <p>
        <sup>
          <FaAsterisk className="syllabus-marker-icon" />
        </sup>
        {labels.mandatory}
      </p>
    </span>
  </>
)

CommentChangesTextarea.propTypes = {
  isError: PropTypes.bool.isRequired,
  labels: PropTypes.shape({
    mandatory: PropTypes.string,
    commentChanges: PropTypes.string,
  }).isRequired,
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  textAboutChanges: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CommentChangesTextarea
