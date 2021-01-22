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
      <FormGroup className="title">
        <ContentHead
          contentId="commentAboutMadeChanges"
          memoLangIndex={memoLangIndex}
          userLangIndex={userLangIndex}
        />
        <Label htmlFor="commentChanges">{labels.commentChanges}</Label>
        <Input
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
  labels: PropTypes.objectOf(PropTypes.string),
  memoLangIndex: PropTypes.number,
  userLangIndex: PropTypes.number,
  textAboutChanges: PropTypes.string,
  onChange: PropTypes.func
}

export default CommentChangesTextarea
