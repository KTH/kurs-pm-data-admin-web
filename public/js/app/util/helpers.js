/* eslint-disable import/prefer-default-export */
export const seasonStr = (translate, semesterCode) =>
  `${translate.season[semesterCode.toString()[4]]}${semesterCode.toString().slice(0, 4)}`
