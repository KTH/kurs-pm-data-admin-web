const table = {
  // content_css: '/kursinfoadmin/kurs-pm-data/static/kth-style/css/kth-bootstrap.min.css', //KTH-STYLE
  table_default_attributes: {
    border: '0'
  },
  table_default_styles: {},
  content_css: '/kursinfoadmin/kurs-pm-data/static/app.css'
}
// min/kurs-pm-data/SF1624/app.js

const editorConf = language => {
  // min_height: 100,
  return {
    menubar: false,
    toolbar_mode: 'wrap',
    toolbar_sticky: true,
    plugins: [
      'advlist autolink autoresize lists link image imagetools charmap preview anchor',
      'searchreplace visualblocks code fullscreen',
      'table paste code help wordcount'
    ],
    ...table,
    language,
    toolbar1: `code | undo redo | formatselect | bold italic underline subscript superscript charmap |
        searchreplace | link | fullscreen `,
    toolbar2: `image |     
        bullist numlist outdent indent | table | removeformat | help`,
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    block_formats: 'Body text=p; Heading=h4'
  }
}

export default editorConf
