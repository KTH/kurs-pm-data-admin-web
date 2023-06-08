import { useState } from 'react'
import i18n from '../../../../i18n'

export const TYPE = {
  SUCCESS: 'success',
  ERROR: 'danger',
}

export const useToast = (userLangIndex, defaultTimeout = 5000) => {
  const { alerts } = i18n.messages[userLangIndex]
  const [toastData, setToastData] = useState({ alertIsOpen: false, alertText: '', alertColor: '' })

  const onToast = (translationId, toastNewColor = 'success', onTimeout = 0) => {
    const newToastState = { alertIsOpen: true, alertText: alerts[translationId], alertColor: toastNewColor }
    if (process.env.NODE_ENV !== 'test') {
      setTimeout(() => {
        setToastData(newToastState)
      }, onTimeout)
    } else setToastData(newToastState)
  }

  const offToast = () => {
    setToastData({ alertIsOpen: false, alertText: '', alertColor: '' })
  }

  const toast = (toastTranslationId, type = TYPE.SUCCESS, onTimeout = 0) => {
    onToast(toastTranslationId, type, onTimeout)
    if (process.env.NODE_ENV !== 'test') {
      setTimeout(() => {
        offToast()
      }, defaultTimeout)
    }
  }

  return { toast, toastData }
}
