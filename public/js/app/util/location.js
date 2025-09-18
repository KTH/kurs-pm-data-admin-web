// export const getLocationHref = () => window.location.href

export const setLocationHref = newLocationHref => window.location.assign(newLocationHref)

export const getLocation = () => window.location

export const setSearch = url => window.history.replaceState({}, '', url)

export const replaceLocation = reloadUrl => window.location.replace(reloadUrl)
