import React from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { ContentHead } from '../ContentHead'

const CommentChangesTextarea = ({
  isError,
  labels,
  memoLangIndex,
  onChange,
  textAboutChanges,
  userLangIndex
}) => (
  <>
    <Form className={isError ? 'error-area' : ''}>
      <FormGroup>
        <ContentHead
          contentId="commentAboutMadeChanges"
          memoLangIndex={memoLangIndex}
          userLangIndex={userLangIndex}
        />
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
        <sup>*</sup>
        {labels.mandatory}
      </p>
    </span>
  </>
)
CommentChangesTextarea.propTypes = {
  isError: PropTypes.bool,
  labels: PropTypes.shape({
    mandatory: PropTypes.string,
    commentChanges: PropTypes.string
  }),
  memoLangIndex: PropTypes.number,
  userLangIndex: PropTypes.number,
  textAboutChanges: PropTypes.string,
  onChange: PropTypes.func
}

export default CommentChangesTextarea
