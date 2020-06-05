# kurs-pm-data-admin-web

# Welcome to kurs-pm-data-admin-web 👋

## Course Information – Administration of course memos

The new administraion site makes it possible to create and manage course memos.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-12.0.0-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

## Introduction

The course information project (KIP) is an initiative at KTH that was launched in 2018 to improve the quality and availability of information about KTH:s courses. The background to the project is, among other things, that it was difficult for the student to find information about the courses and even more difficult to compare information about several courses. The reason for the problems is scattered course information in several places and that there is no uniformity or assigned places for the course information. The project takes measures to consolidate course information into two locations and to present the information in a manner that is uniform for KTH. The student should find the right information about the course, depending on their needs. The result of the project is a public course site where the correct course information is collected and presented uniformly. Also, a tool is developed for teachers to enter and publish course information. Eventually, this will lead to the student making better decisions based on their needs, and it will also reduce the burden on teachers and administration regarding questions and support for the student.

`Kurs-pm-data-admin-web` is a microservice to save course memos data by sending it to `kurs-pm-data-api`. It uses `React`, `MobX`, and is based on [https://github.com/KTH/node-web](https://github.com/KTH/node-web).

### 🏠 [Homepage](https://github.com/KTH/kurs-pm-data-admin-web)

## Overview

TBD

## API

Application is fetching/saving data from/to [https://github.com/KTH/kurs-pm-data-api](https://github.com/KTH/kurs-pm-data-api).

### Related projects

- [https://github.com/KTH/kurs-pm-data-api](https://github.com/KTH/kurs-pm-data-api)
- [https://github.com/KTH/kurs-pm-web](https://github.com/KTH/kurs-pm-web)
- [https://github.com/KTH/node-web](https://github.com/KTH/node-api)

## Prerequisites

- Node.js 12.0.0
- Ansible Vault

### Secrets for Development

Secrets during local development are ALWAYS stored in a `.env`-file in the root of your project. This file should be in .gitignore. It needs to contain at least ldap connection URI and password in order for authentication to work properly.

```
KURS_PM_DATA_API_URI=http://localhost:3001/api/kurs-pm-data
KURS_PM_DATA_API_KEY=[generated in kurs-pm-data-admin-api key for admin page]
KURS_INFO_API_URI=https://api-r.referens.sys.kth.se/api/kursinfo
KURS_INFO_API_KEY=[generated in kursinfo-api key for public pages, just for image displaying and selling text]
REDIS_URI=[redis connection string, azure]
LDAP_BASE=OU=UG,DC=[ref],DC=ug,DC=kth,DC=se
LDAP_URI=ldaps://[ldap username]@[ref].ug.kth.se@ldap.[ref].ug.kth.se
LDAP_PASSWORD=[ldap password]
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

To monitor status: http://localhost:3000/kursinfoadmin/kurs-pm-data/_monitor

To see branch information: http://localhost:3000/kursinfoadmin/kurs-pm-data/_about

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
LDAP_BASE=OU=UG,DC=[ref],DC=ug,DC=kth,DC=se
LDAP_URI=ldaps://[ldap username]@[ref].ug.kth.se@ldap.[ref].ug.kth.se
LDAP_PASSWORD=[ldap password]
SESSION_SECRET=[generate session secret]
SESSION_KEY=kurs-pm-data-admin-web.pid
UG_REDIS_URI=team-studam-ref-redis-193.redis.cache.windows.net:[port],password=[password],ssl=True,abortConnect=False
APPINSIGHTS_INSTRUMENTATIONKEY=[Azure, Application insights, Instrumentation Key, can be found in Overview]
```

## Author

👤 **KTH**

- Website: https://kth.github.io/
- Github: [@KTH](https://github.com/KTH)
