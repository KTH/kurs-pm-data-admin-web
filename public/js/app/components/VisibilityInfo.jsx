/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import { context, contentParam, isRequired, typeOfHeader } from '../util/fieldsByType'

import i18n from '../../../../i18n'
import { OnClickPropagationStopper } from './editors/OnClickPropagationStopper'

const VisibilityInfo = ({ contentId, visibleInMemo, onToggleVisibleInMemo, sectionType, userLangIndex, children }) => {
  const dataOrigin = contentParam(contentId, 'source')
  const isHeaderInConf = !!context[contentId]

  const { sourceInfo } = i18n.messages[userLangIndex]
  const { fetched } = sourceInfo
  return (
    <span className="section-info">
      <span className="section_info_visibility_label">
        {(isRequired(contentId) && (
          <p className="mandatory" data-testid="data-origin">
            <b>{sourceInfo[typeOfHeader(contentId)]}</b>
            {dataOrigin && ' \u007C ' + fetched}
            {dataOrigin && sourceInfo[dataOrigin]}
          </p>
        )) || (
          <OnClickPropagationStopper>
            <form className="Show--Or--Not--inMemo">
              <div className="form-check form-group">
                <input
                  className="form-check-input"
                  data-testid={`checkbox-visibility-${contentId}`}
                  type="checkbox"
                  id={'visibility-for-' + contentId}
                  name="visibleInMemo"
                  onClick={() => onToggleVisibleInMemo(contentId)}
                  defaultChecked={visibleInMemo || false}
                  style={{ marginRight: '.3em' }}
                />
                <label
                  className="form-control-label"
                  data-testid="label-visibility"
                  htmlFor={'visibility-for-' + contentId}
                  style={{ fontSize: '1rem' }}
                >
                  {' '}
                  {sourceInfo.includeInMemo[sectionType]}
                </label>
                {isHeaderInConf && dataOrigin && ` ${'\u007C'} ${fetched}`}
                {isHeaderInConf && dataOrigin && sourceInfo[dataOrigin]}
              </div>
            </form>
          </OnClickPropagationStopper>
        )}
      </span>
      {children}
    </span>
  )
}

VisibilityInfo.propTypes = {
  contentId: PropTypes.string.isRequired,
  visibleInMemo: PropTypes.bool.isRequired,
  onToggleVisibleInMemo: PropTypes.func.isRequired, // add default
  sectionType: PropTypes.string.isRequired, // add default
  userLangIndex: PropTypes.oneOf([1, 0]).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

export default VisibilityInfo
