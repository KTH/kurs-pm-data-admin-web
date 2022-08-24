/* eslint-disable no-undef */
// editor.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Test TinyMce simple editor <EditorSimpleElement>', () => {
  beforeEach(() => cy.visit('/_test_editor'))

  it.skip('Check if iframe of the editor shows', () =>
    cy.get('iframe[id="editor-for-examinationSubSection-simple_ifr"]').should('exist'))

  it.skip('Check if tinyMce editor exists', () =>
    cy
      .window()
      .then(win => win.tinymce.editors['editor-for-examinationSubSection-simple'])
      .then(cy.wrap)
      .should('exist'))

  it.skip('Check if tinyMce editor is not empty', () =>
    cy.get('iframe').its('0.contentDocument.body').should('not.be.empty'))

  it.skip('Check if the editor shows a correct initial value', () =>
    cy
      .get('iframe')
      .its('0.contentDocument.body')
      .contains('Examination will be edited next week after examination day'))

  it.skip('Check if a new sentence is added to the initial text', () =>
    cy
      .get('iframe')
      .its('0.contentDocument.body')
      .type('. ')
      .type('For an additional info')
      .type(', look at a course page')
      .contains(
        'Examination will be edited next week after examination day. For an additional info, look at a course page'
      ))
})

describe('Test a standard TinyMce editor with a local state, <StandardEditorWithTitleAndLocalState />', () => {
  const startText = 'Ethical Approach Content For A Second Editor'
  beforeEach(() => cy.visit('/_test_editor'))

  it.skip('Check if iframe of the editor shows', () =>
    cy.get('iframe[id="editor-for-ethicalApproachSubSection_ifr"]').should('exist'))

  it.skip('Check if tinyMce editor exists', () =>
    cy
      .window()
      .then(win => win.tinymce.editors['editor-for-ethicalApproachSubSection'])
      .then(cy.wrap)
      .should('exist'))

  it.skip('Check if tinyMce editor is not empty', () =>
    cy
      .get('iframe[id="editor-for-ethicalApproachSubSection_ifr"]')
      .its('0.contentDocument.body')
      .should('not.be.empty'))

  it.skip('Check if the editor shows a correct initial value', () =>
    cy.get('iframe[id="editor-for-ethicalApproachSubSection_ifr"]').its('0.contentDocument.body').contains(startText))

  it.skip('Check if a new sentence is added to the initial text', () => {
    const addedText = 'Additional content for a second editor'
    const endText = ' End of test!'
    cy.get('iframe[id="editor-for-ethicalApproachSubSection_ifr"]')
      .its('0.contentDocument.body')
      .contains(`${startText}`)
      .type('. ')
      .contains(`${startText}.`)
      .type(addedText)
      .type('!')
      .contains(`${startText}. ${addedText}!`)

    cy.get('iframe[id="editor-for-ethicalApproachSubSection_ifr"]')
      .its('0.contentDocument.body')
      .type(endText)
      .contains(`${startText}. ${addedText}!${endText}`)
  })
})

describe('Show a TinyMce editor (not plain-text section) with a store state, <StandardSectionOrEditor />', () => {
  beforeEach(() => cy.visit('/_test_editor'))

  it.skip('Check if iframe of the editor shows', () => cy.get('iframe[id="editor-for-literature_ifr"]').should('exist'))

  it.skip('Check if tinyMce editor exists', () =>
    cy
      .window()
      .then(win => win.tinymce.editors['editor-for-literature'])
      .then(cy.wrap)
      .should('exist'))

  it.skip('Check if tinyMce editor is not empty', () =>
    cy.get('iframe[id="editor-for-literature_ifr"]').its('0.contentDocument.body').should('not.be.empty'))

  it.skip('Check if the editor shows a correct initial value', () =>
    cy
      .get('iframe[id="editor-for-literature_ifr"]')
      .its('0.contentDocument.body')
      .contains('Literature Content For A Third Editor with Store State'))

  it.skip('Check if a new sentence is added to the initial text', () => {
    const addText = 'Additional content for a literature editor'

    cy.get('iframe[id="editor-for-literature_ifr"]')
      .its('0.contentDocument.body')
      .type('. ')
      .type(addText)
      .type('!')
      .contains(`Literature Content For A Third Editor with Store State. ${addText}!`)

    cy.get('iframe[id="editor-for-literature_ifr"]')
      .its('0.contentDocument.body')
      .type(' End of test.')
      .contains(`Literature Content For A Third Editor with Store State. ${addText}! End of test.`)
  })
})
