/* eslint-disable no-undef */
// editor.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Test TinyMce simple editor <EditorSimpleElement>', () => {
  beforeEach(() => cy.visit('/_test_editor'))

  it('Check if iframe of the editor shows', () =>
    cy.get('iframe[id="editorFor-examinationSubSection-simple_ifr"]').should('exist'))

  it('Check if tinyMce editor exists', () =>
    cy
      .window()
      .then(win => win.tinymce.editors['editorFor-examinationSubSection-simple'])
      .then(cy.wrap)
      .should('exist'))

  it('Check if tinyMce editor is not empty', () =>
    cy.get('iframe').its('0.contentDocument.body').should('not.be.empty'))

  it('Check if the editor shows a correct initial value', () =>
    cy
      .get('iframe')
      .its('0.contentDocument.body')
      .contains('Examination will be edited next week after examination day'))

  it('Check if a new sentence is added to the initial text', () =>
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
  beforeEach(() => cy.visit('/_test_editor'))

  it('Check if iframe of the editor shows', () =>
    cy.get('iframe[id="editorForexaminationSubSection_ifr"]').should('exist'))

  it('Check if tinyMce editor exists', () =>
    cy
      .window()
      .then(win => win.tinymce.editors['editorFor-examinationSubSection'])
      .then(cy.wrap)
      .should('exist'))

  it('Check if tinyMce editor is not empty', () =>
    cy.get('iframe[id="editorForexaminationSubSection_ifr"]').its('0.contentDocument.body').should('not.be.empty'))

  it('Check if the editor shows a correct initial value', () =>
    cy
      .get('iframe[id="editorForexaminationSubSection_ifr"]')
      .its('0.contentDocument.body')
      .contains('Examination Content For A Second Editor'))

  it('Check if a new sentence is added to the initial text', () => {
    const addText = 'Additional content for a second editor'

    cy.get('iframe[id="editorForexaminationSubSection_ifr"]')
      .its('0.contentDocument.body')
      .type('. ')
      .type(addText)
      .type('!')
      .contains(`Examination Content For A Second Editor. ${addText}!`)

    cy.get('iframe[id="editorForexaminationSubSection_ifr"]')
      .its('0.contentDocument.body')
      .type(' End of test!')
      .contains(`Examination Content For A Second Editor. ${addText}! End of test!`)
  })
})

describe('Show a TinyMce editor (not plain-text section) with a store state, <StandardSectionOrEditor />', () => {
  beforeEach(() => cy.visit('/_test_editor'))

  it('Check if iframe of the editor shows', () => cy.get('iframe[id="editorForliterature_ifr"]').should('exist'))

  it('Check if tinyMce editor exists', () =>
    cy
      .window()
      .then(win => win.tinymce.editors['editorFor-literature'])
      .then(cy.wrap)
      .should('exist'))

  it('Check if tinyMce editor is not empty', () =>
    cy.get('iframe[id="editorForliterature_ifr"]').its('0.contentDocument.body').should('not.be.empty'))

  it('Check if the editor shows a correct initial value', () =>
    cy
      .get('iframe[id="editorForliterature_ifr"]')
      .its('0.contentDocument.body')
      .contains('Literature Content For A Third Editor with Store State'))

  it('Check if a new sentence is added to the initial text', () => {
    const addText = 'Additional content for a literature editor'

    cy.get('iframe[id="editorForliterature_ifr"]')
      .its('0.contentDocument.body')
      .type('. ')
      .type(addText)
      .type('!')
      .contains(`Literature Content For A Third Editor with Store State. ${addText}!`)

    cy.get('iframe[id="editorForliterature_ifr"]')
      .its('0.contentDocument.body')
      .type(' End of test.')
      .contains(`Literature Content For A Third Editor with Store State. ${addText}! End of test.`)
  })
})
