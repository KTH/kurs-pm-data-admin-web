const _menuContent = [
  {
    level: 'ancestor',
    title: 'Innehåll och lärandemål'
  },
  {
    level: 'item',
    title: 'Lärandemål',
    selected: true,
    href: '#'
  },
  {
    level: 'ancestor',
    title: 'Genomföra kursen'
  },
  {
    level: 'item',
    title: 'Detaljplanering',
    selected: false,
    href: '#1'
  },
  {
    level: 'ancestor',
    title: 'Examination och slutförande'
  },
  {
    level: 'item',
    title: 'Målrelaterade betygskriterier',
    selected: false,
    href: '#2'
  }
]

module.exports = {
  menuContent: _menuContent
}
