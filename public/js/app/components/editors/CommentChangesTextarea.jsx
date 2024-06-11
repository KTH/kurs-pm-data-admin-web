import React from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Label, Input } from 'reactstrap'

import { ContentHead } from '../ContentHead'

const CommentChangesTextarea = ({ isError, labels, memoLangIndex, onChange, textAboutChanges, userLangIndex }) => (
  <Form className={isError ? 'error-area' : ''}>
    <FormGroup>
      <ContentHead contentId="commentAboutMadeChanges" memoLangIndex={memoLangIndex} userLangIndex={userLangIndex} />
      <Label className="form-control-label" htmlFor="commentChanges" data-testid="text-about-changes">
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
)

CommentChangesTextarea.propTypes = {
  isError: PropTypes.bool.isRequired,
  labels: PropTypes.shape({
    commentChanges: PropTypes.string,
  }).isRequired,
  memoLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  textAboutChanges: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

CommentChangesTextarea.defaultProps = {
  textAboutChanges: '',
}

export default CommentChangesTextarea
