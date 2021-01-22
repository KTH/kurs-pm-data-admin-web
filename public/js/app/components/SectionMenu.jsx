/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { FaRegEyeSlash } from 'react-icons/fa'
import { inject, observer } from 'mobx-react'
import { sections, isRequired } from '../util/fieldsByType'
import i18n from '../../../../i18n'
import ProgressTitle from './ProgressTitle'
import PropTypes from 'prop-types'

const showEyeSlashIcon = (contentId, visibleInMemoProp) => {
  if (isRequired(contentId)) {
    // Required headers are always visible, don’t show an eye slash icon
    return false
  }

  if (visibleInMemoProp && typeof visibleInMemoProp === 'object' && visibleInMemoProp[contentId]) {
    // Header isn’t required and there’s a display mode saved
    // Display mode is inverted from whether or not an eye slash icon should be shown
    return !visibleInMemoProp[contentId]
  }
  if (typeof visibleInMemoProp === 'boolean') return !visibleInMemoProp

  // Header isn’t required and there’s no display mode saved
  // Default is to hide header and therefor to show an eye slash icon
  return true
}

@inject(['routerStore'])
@observer
class SectionMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // setExpandedId = (expandedId) => {
  //   this.setState(({ expandedIds }) => {
  //     if (!expandedIds.includes(expandedId)) {
  //       expandedIds.push(expandedId)
  //     }
  //     return { expandedIds }
  //   })
  // }

  // removeExpandedId = (expandedId) =>
  //   this.setState(({ expandedIds }) => ({
  //     expandedIds: expandedIds.filter((id) => id !== expandedId)
  //   }))

  // isExpandedId = (id) => this.state.expandedIds.includes(id)

  // componentDidMount = () => {
  //   if (this.state.expandedIds.length === 0) this.setState({ expandedIds: [sections[0].id] })
  // }

  render() {
    const { memoTitlesByMemoLang } = i18n.messages[this.props.memoLangIndex]
    const { extraInfo } = i18n.messages[this.props.userLangIndex]

    const { memoData } = this.props.routerStore

    const { activeTab } = this.props
    const activeSection = sections.find(({ id }) => id === activeTab)
    const { id, content, extraHeaderTitle } = activeSection

    return (
      <MainMenu extraClasses={['pl-0', 'h-100']} menuHeaderAndInfo={extraInfo.contentHeaders}>
        {/* {sections.map(({ id, content, extraHeaderTitle }) => ( */}
        {/* <NavItemCollapse
          key={'nav-item-node-' + id}
          id={id}
          title={sectionsLabels[id]}
          isExpandedId={this.isExpandedId}
          setExpandedId={this.setExpandedId}
          removeExpandedId={this.removeExpandedId}
        > */}
        {content.map(
          (contentId) =>
            memoTitlesByMemoLang[contentId] && (
              <NavItemLink
                key={'nav-litem-leaf-' + contentId}
                id={id + '-' + contentId}
                title={memoTitlesByMemoLang[contentId]}
                showEyeSlashIcon={showEyeSlashIcon(contentId, this.props.visiblesOfStandard)}
              />
            )
        )}
        {extraHeaderTitle &&
          memoData[extraHeaderTitle] &&
          memoData[extraHeaderTitle].map(({ uKey, title, visibleInMemo: isVisible }) => (
            <NavItemLink
              key={'nav-litem-leaf-' + uKey}
              id={id + '-' + extraHeaderTitle + uKey}
              title={title}
              showEyeSlashIcon={showEyeSlashIcon(uKey, isVisible)}
            />
          ))}
        {/* </NavItemCollapse> */}
        {/* ))} */}
        {this.props.children}
      </MainMenu>
    )
  }
}

const MainMenu = ({ extraClasses = '', menuHeaderAndInfo, children }) => (
  <>
    <ProgressTitle id="select-header" text={menuHeaderAndInfo} />
    <nav
      id="mainMenu"
      className={
        'content-overview col navbar navbar-expand-lg navbar-light ' + extraClasses.join(' ')
      }
    >
      {children}
    </nav>
  </>
)

// const NavItemCollapse = ({
//   id,
//   title,
//   isExpandedId,
//   setExpandedId,
//   removeExpandedId,
//   children
// }) => (
//   <Collapse
//     isOpen={id === 'contentAndOutcomes' || isExpandedId(id)}
//     onOpening={() => setExpandedId(id)}
//     onClosing={() => removeExpandedId(id)}
//     buttonText={title}
//     color="blue"
//     uLabel={id}
//   >
//     {children}
//   </Collapse>
// )

const NavItemLink = ({ id, title, showEyeSlashIcon: showIcon }) => (
  <p className="nav-link-to-content-header">
    <Link smooth to={'#' + id} scroll={(el) => el.scrollIntoView({ behavior: 'smooth' })}>
      <span>{title}</span>
    </Link>
    {showIcon && <FaRegEyeSlash className="section_info_visibility_icon" />}
  </p>
)

NavItemLink.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showEyeSlashIcon: PropTypes.bool.isRequired
}

MainMenu.propTypes = {
  extraClasses: PropTypes.arrayOf(PropTypes.string).isRequired,
  menuHeaderAndInfo: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.node.isRequired
}

// NavItemCollapse.propTypes = {
//   id: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   // isExpandedId: PropTypes.func.isRequired,
//   // setExpandedId: PropTypes.func.isRequired,
//   // removeExpandedId: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired
// }

SectionMenu.propTypes = {
  activeTab: PropTypes.string.isRequired,
  children: PropTypes.node,
  memoLangIndex: PropTypes.number.isRequired,
  userLangIndex: PropTypes.number.isRequired,
  visiblesOfStandard: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  // eslint-disable-next-line react/require-default-props
  routerStore: PropTypes.func
}

SectionMenu.defaultProps = {
  children: ''
}

export default SectionMenu