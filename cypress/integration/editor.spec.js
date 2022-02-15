/* eslint-disable no-undef */
// editor.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Test TinyMce simple editor <EditorSimpleElement>', () => {
  beforeEach(() => cy.visit('http://localhost:3000/kursinfoadmin/kurs-pm-data/_test_editor/'))

  it('Check if iframe of the editor shows', () =>
    cy.get('iframe[id="editorFor-examinationSubSection-simple_ifr"]').should('exist'))

  it('Check if tinyMce editor exists', () => cy.getTinyMce('editorFor-examinationSubSection-simple').should('exist'))

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
      .type('. For an additional info, look at a course page')
      .contains(
        'Examination will be edited next week after examination day. For an additional info, look at a course page'
      ))
})

describe('Test a standard TinyMce editor with a local state, <StandardEditorWithTitleAndLocalState />', () => {
  beforeEach(() => cy.visit('http://localhost:3000/kursinfoadmin/kurs-pm-data/_test_editor/'))

  it('Check if iframe of the editor shows', () =>
    cy.get('iframe[id="editorForexaminationSubSection_ifr"]').should('exist'))

  it('Check if tinyMce editor exists', () => cy.getTinyMce('editorFor-examinationSubSection').should('exist'))

  it('Check if tinyMce editor is not empty', () =>
    cy.get('iframe[id="editorForexaminationSubSection_ifr"]').its('0.contentDocument.body').should('not.be.empty'))

  it('Check if the editor shows a correct initial value', () =>
    cy
      .get('iframe[id="editorForexaminationSubSection_ifr"]')
      .its('0.contentDocument.body')
      .contains('Examination Content For A Second Editor'))

  it('Check if a new sentence is added to the initial text', () => {
    const addText = '. Additional content for a second editor'

    cy.get('iframe[id="editorForexaminationSubSection_ifr"]')
      .its('0.contentDocument.body')
      .type(addText)
      .contains(`Examination Content For A Second Editor${addText}`)
  })
})

describe('Show a TinyMce editor (not plain-text section) with a store state, <StandardSectionOrEditor />', () => {
  beforeEach(() => cy.visit('http://localhost:3000/kursinfoadmin/kurs-pm-data/_test_editor/'))

  it('Check if iframe of the editor shows', () => cy.get('iframe[id="editorForliterature_ifr"]').should('exist'))

  it('Check if tinyMce editor exists', () => cy.getTinyMce('editorFor-literature').should('exist'))

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
      .contains(`Literature Content For A Third Editor with Store State. ${addText}`)
  })
})
