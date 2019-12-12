const _menuContent = [
  {
    level: 'ancestor',
    title: 'Innehåll och lärandemål'
  },
  {
    level: 'item',
    title: 'Lärandemål',
    selected: true,
    href: '#learningOutcomes'
  },
  {
    level: 'ancestor',
    title: 'Genomföra kursen'
  },
  {
    level: 'item',
    title: 'Detaljplanering',
    selected: false,
    href: '#planning'
  },
  {
    level: 'ancestor',
    title: 'Examination och slutförande'
  },
  {
    level: 'item',
    title: 'Målrelaterade betygskriterier',
    selected: false,
    href: '#gradingCriteria'
  }
]

module.exports = {
  menuContent: _menuContent
}
