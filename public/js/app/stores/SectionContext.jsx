import React from 'react'

const SectionContext = React.createContext({
  isEditorOpen: {},
  getIsEditorOpen: () => {
    throw new Error('getIsEditorOpen can only be called within a child of SectionContextProvider')
  },
})

const SectionContextProvider = ({ children }) => {
  const [isEditorOpen, setIsEditorOpen] = React.useState({})

  const value = React.useMemo(() => {
    return { isEditorOpen, setIsEditorOpen }
  }, [isEditorOpen, setIsEditorOpen])

  return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
}

const useSectionContext = () => {
  const { isEditorOpen, setIsEditorOpen } = React.useContext(SectionContext)

  return {
    setIsEditorOpen(editorId, value) {
      setIsEditorOpen({ ...isEditorOpen, [editorId]: value })
    },
    getIsEditorOpen(editorId) {
      return isEditorOpen[editorId]
    },
  }
}

export { SectionContextProvider, useSectionContext }
