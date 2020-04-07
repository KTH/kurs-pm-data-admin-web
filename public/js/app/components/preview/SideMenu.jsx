import React from 'react'

const SideMenu = ({ courseCode, courseMemoItems, backLink, labels }) => {
  return (
    <div>
      <p>
        &lsaquo;&nbsp;
        <a href={backLink}>{labels.directory}</a>
      </p>
      <p>
        <b>{`${labels.aboutCourse} ${courseCode}`}</b>
      </p>
      <hr />
      <p>{labels.beforeChoosingCourse}</p>
      <p>
        <b>{labels.courseMemo}</b>
      </p>
      <hr />
      <div className="menu-memos">
        {courseMemoItems.map(({ label, url, active }) => {
          return active ? (
            <p key={label} className="active">
              {label}
            </p>
          ) : (
            <p key={label}>
              <a href={url}>{label}</a>
            </p>
          )
        })}
      </div>
      <p>{labels.finishCourse}</p>
      <p>{labels.courseDevelopmentAndHistory}</p>
    </div>
  )
}

export default SideMenu
