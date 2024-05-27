const legacyAlertColorToType = color => {
  switch (color) {
    case 'info':
      return 'info'
    case 'success':
      return 'success'
    case 'danger':
      return 'warning'
    case 'warn':
      return 'warning'
    default:
      return undefined
  }
}

export { legacyAlertColorToType }
