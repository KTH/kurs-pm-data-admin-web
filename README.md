# Welcome to kurs-pm-data-admin-web 👋

## Course Information – Administration of course memos

The new administraion site makes it possible to create and manage course memos.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-14.2.0-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

## Introduction

The course information project (KIP) is an initiative at KTH that was launched in 2018 to improve the quality and availability of information about KTH:s courses. The background to the project is, among other things, that it was difficult for the student to find information about the courses and even more difficult to compare information about several courses. The reason for the problems is scattered course information in several places and that there is no uniformity or assigned places for the course information. The project takes measures to consolidate course information into two locations and to present the information in a manner that is uniform for KTH. The student should find the right information about the course, depending on their needs. The result of the project is a public course site where the correct course information is collected and presented uniformly. Also, a tool is developed for teachers to enter and publish course information. Eventually, this will lead to the student making better decisions based on their needs, and it will also reduce the burden on teachers and administration regarding questions and support for the student.

`Kurs-pm-data-admin-web` is a microservice to save course memos data by sending it to `kurs-pm-data-api`. It uses `React`, `MobX`, and is based on [https://github.com/KTH/node-web](https://github.com/KTH/node-web).

### 🏠 [Homepage](https://github.com/KTH/kurs-pm-data-admin-web)

## Overview

Course memos servise can be used by teachers, course responsibles and examiners to create a more detailed overview of a course. To simplify work, default values and course syllabus information are provided in memo. User can create a new course memo, save it as a draft and publish it as well as user can edit already published course memos to keep students updated with last changes in course memo.

## API

Application is fetching/saving data from/to [https://github.com/KTH/kurs-pm-data-api](https://github.com/KTH/kurs-pm-data-api).

### Related projects

- [https://github.com/KTH/kurs-pm-data-api](https://github.com/KTH/kurs-pm-data-api)
- [https://github.com/KTH/kurs-pm-web](https://github.com/KTH/kurs-pm-web)
- [https://github.com/KTH/node-web](https://github.com/KTH/node-api)

## Prerequisites

- Node.js 14.2.0

Because OICD library is compatible only with node 12.0.0 or > 14.2.0

### Secrets for Development

Secrets during local development are ALWAYS stored in a `.env`-file in the root of your project. This file should be in .gitignore.

```
KURS_PM_DATA_API_URI=http://localhost:3001/api/kurs-pm-data
KURS_PM_DATA_API_KEY=[generated in kurs-pm-data-admin-api key for admin page]
KURS_INFO_API_URI=https://api-r.referens.sys.kth.se/api/kursinfo
KURS_INFO_API_KEY=[generated in kursinfo-api key for public pages, just for image displaying and selling text]
REDIS_URI=[redis connection string, azure]
OIDC_APPLICATION_ID=<FROM ADFS>
OIDC_CLIENT_SECRET=<FROM ADFS>
OIDC_TOKEN_SECRET=<Random string>
SESSION_SECRET=[generate session secret]
SESSION_KEY=kurs-pm-data-admin-web.pid
UG_REDIS_URI=team-studam-ref-redis-193.redis.cache.windows.net:[port],password=[password],ssl=True,abortConnect=False
```

These settings are also available in an `env.in` file.

## Install

```sh
npm install
```

## Usage

Start the service on [http://localhost:3000/kursinfoadmin/kurs-pm-data/:courseCode](http://localhost:3001/api/kurs-pm-data/swagger).

```sh
npm run start-dev
```

Choose to Create a new memo http://localhost:3000/kursinfoadmin/kurs-pm-data/BB2290/

Choose to edit published memo http://localhost:3000/kursinfoadmin/kurs-pm-data/published/BB2290/

Editor to fill in course memo http://localhost:3000/kursinfoadmin/kurs-pm-data/BB2290/BB229020191-1

Preview course memo http://localhost:3000/kursinfoadmin/kurs-pm-data/BB2290/BB229020191-1/preview

`BB229020191-1` är memoEndPoint which is used as a bookmark for a course memo even if its data changed, draft is created, published, edited an so on.

## In production

Secrets and docker-compose are located in cellus-registry.

Used:

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Use 🐳

Copy `docker-compose.yml.in` to `docker-compose.yml` and make necessary changes, if any.

```sh
docker-compose up
```

### Monitor and dashboards

Status:

To monitor status: http://localhost:3000/kursinfoadmin/kurs-pm-data/\_monitor

To see branch information: http://localhost:3000/kursinfoadmin/kurs-pm-data/\_about

To see more detailed behaviour in project used application insights: f.e., kursinfo-web-stage-application-insights-kthse

## Deploy in Stage

The deployment process is described in [Build, release, deploy](https://confluence.sys.kth.se/confluence/x/aY3_Ag). Technical details, such as configuration, is described in [How to deploy your 🐳 application using Cellus-Registy](https://gita.sys.kth.se/Infosys/cellus-registry/blob/master/HOW-TO-DEPLOY.md) and [🔧 How To Configure Your Application For The Pipeline](https://gita.sys.kth.se/Infosys/cellus-registry/blob/master/HOW-TO-CONFIGURE.md).

### Edit secrets.env

```sh
ansible-vault edit secrets.env
```

Password find in gsv-key vault

### Configure secrets.env

```
KURS_PM_DATA_API_URI=http://localhost:3001/api/kurs-pm-data
KURS_PM_DATA_API_KEY=[generated in kurs-pm-data-admin-api key for admin page]
KURS_INFO_API_URI=https://api-r.referens.sys.kth.se/api/kursinfo
KURS_INFO_API_KEY=[generated in kursinfo-api key for public pages, just for image displaying and selling text]
REDIS_URI=[redis connection string, azure]
OIDC_APPLICATION_ID=<FROM ADFS>
OIDC_CLIENT_SECRET=<FROM ADFS>
OIDC_TOKEN_SECRET=<Random string>
SESSION_SECRET=[generate session secret]
SESSION_KEY=kurs-pm-data-admin-web.pid
UG_REDIS_URI=team-studam-ref-redis-193.redis.cache.windows.net:[port],password=[password],ssl=True,abortConnect=False
APPINSIGHTS_INSTRUMENTATIONKEY=[Azure, Application insights, Instrumentation Key, can be found in Overview]
```

## Editor TinyMce

In `tinymce` catalog located tinymce api to make load of editor faster and to customize some translations/texts.

### Edited English and Swedish translations for editor's buttons

Translations for swedish translations located in `tinymce > langs > sv_SE.js`
It was customized:

- `'Header 4': 'Rubrik 4'` was changed to `Heading: 'Rubrik'`
- `Paragraph: 'Avsnitt'` was changed to `'Body text': 'Brödtext'`

To make this changes viable, in the configuration of block_formats was changed to:
`block_formats: 'Body text=p;Heading=h4',`
and define `language` if it is Swedish it will be: `sv_SE`

### KTH and local Style in editor

In `js > app > util > editorInitConf.js` defined `content_css: '/kursinfoadmin/kurs-pm-data/static/app.css'`
It uses local parsed app.css (from local node-web.scss).

### Configuration and used plugins

Configuration is in `js > app > util > editorInitConf.js`

```
const table = {
  table_default_attributes: {
    border: '0',
  },
  table_default_styles: {},
  content_css: '/kursinfoadmin/kurs-pm-data/static/app.css',
}

const editorConf = language => ({
  menubar: false,
  toolbar_mode: 'wrap',
  toolbar_sticky: true,
  plugins: [
    'advlist autolink autoresize lists link charmap preview anchor',
    'searchreplace visualblocks code fullscreen',
    'table paste code help wordcount',
  ],
  ...table,
  language,
  toolbar1: `code | undo redo | formatselect | bold italic underline subscript superscript charmap |
        searchreplace | link | fullscreen `,
  toolbar2: `bullist numlist outdent indent | table | removeformat | help`,
  block_formats: 'Body text=p;Heading=h4',
})
```

- `toolbar_sticky: true` is to make editor meny to be on top of editor if it's longer then screan.
- `toolbar_mode: 'wrap'`. Wrap toolbar into two rows.
- `toolbar1` and `toolbar2` defines which buttons to display on 1st and 2nd rows.
- `content_css` is needed mostly to style tables and fonts
- `block_formats` user can create only Paragraphs and headers-h4 inside editor.
- `table_default_styles` is to cancel default styles of tables
- `table_default_attributes` is to make border invisible via `border: '0'`
- `language` is needed only for Swedish translations: sv_SE. Otherwise it is 'null'.

### Set up your development environment on Windows

To be able to run desktop Linux apps(Ansible Vault or other) on Windows 10 and be able to use Bash commands or tools with and/or plan to deploy to a Linux server or use Docker containers from VSCode we need Linux distribution (ie. Ubuntu) running on the Windows Subsystem for Linux (WSL). Latest version of Windows allows us to do that by installing WLS 2.
Here is everything you need to do to get there.

- Install Windows Subsystem for Linux (WSL), including a Linux distribution (like Ubuntu) and make sure it is running in WSL 2 mode.(https://docs.microsoft.com/en-us/windows/wsl/install)
- Install the Microsoft Terminal app to start exploring your newly-installed Ubuntu.(https://www.microsoft.com/sv-se/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab)
- Change in VSCode in Terminal settings your default shell to wsl.

Now you are able to use Bash commands or tools.

## Author

👤 **KTH**

- Website: https://kth.github.io/
- Github: [@KTH](https://github.com/KTH)
