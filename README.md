# educationELLy

![NodeJS](https://img.shields.io/badge/Node.js-badge.svg?style=popout&logo=node.js&labelColor=2873b4&logoColor=fb9438&color=86c64e)
![MongoDB](https://img.shields.io/badge/MongoDB-badge.svg?style=popout&logo=mongodb&labelColor=2873b4&logoColor=fb9438&color=86c64e)

> **educationELLy** aims to engage regular classroom teachers in the English language learning process by providing them with quick access to relevant information about the ELL students in their classes. By making ELL student information accessible to mainstream teachers and ELL teachers alike, educationELLy keeps an ELL student's teachers updated on his or her English language proficiency and provides a centralized platform through which all teachers can participate in the feedback process. educationELLy bridges the gap between ELL teachers and regular teachers and facilitates the creation of a more integrated curriculum for English language learners. With educationELLy, all teachers become language teachers.

## Build Status
[![npm version](https://img.shields.io/badge/npm%20package-6.4.1-86c64e.svg?style=popout-square&logo=npm)](https://badge.fury.io/js/npm)  [![Build Status](https://img.shields.io/travis/maxjeffwell/full-stack-capstone-server.svg?style=popout-square&logo=travis&color=2873b4)](https://travis-ci.org/maxjeffwell/full-stack-capstone-server) ![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-fb9438.svg?style=popout-square&logo=appveyor&logoColor=86c64e) [![Live Demo](https://img.shields.io/badge/demo-online-86c64e.svg?style=popout-square&logo=heroku&logoColor=2873b4&color=86c64e)](https://jmaxwell-fullstack-client.herokuapp.com/)

```
Demo Account

username: demo
password: demopassword
```

## Screenshots

[![educationELLy Desktop Landing Page](https://i.gyazo.com/e98b1d2276640f2cb0a54adee95896c2.png)](https://gyazo.com/e98b1d2276640f2cb0a54adee95896c2)

[![educationELLy Desktop Login Page](https://i.gyazo.com/2d67665682bed2ed50fad959e1b6f26f.png)](https://gyazo.com/2d67665682bed2ed50fad959e1b6f26f)

[![educationELLy Desktop Registration Page](https://i.gyazo.com/ed654f3e775d938c17018d9bb540ffa1.png)](https://gyazo.com/ed654f3e775d938c17018d9bb540ffa1)

[![educationELLy Desktop Instructor Dashboard Page](https://i.gyazo.com/9edd9b0e825a85b5b4c6f30a1e277f70.png)](https://gyazo.com/9edd9b0e825a85b5b4c6f30a1e277f70)

[![educationELLy Desktop Student List Page](https://i.gyazo.com/3bedb6168f8df87c6777ef2285418882.png)](https://gyazo.com/3bedb6168f8df87c6777ef2285418882)

[![educationELLy Desktop Update Student Page](https://i.gyazo.com/489ca40991dbdb5227b7a4814448d1a9.png)](https://gyazo.com/489ca40991dbdb5227b7a4814448d1a9)

[![educationELLy Desktop Create Student Page](https://i.gyazo.com/504eb28443de1f891f0a3d267649b4c7.png)](https://gyazo.com/504eb28443de1f891f0a3d267649b4c7)

[![educationELLy Delete Confirmation Modal](https://i.gyazo.com/6559db4cf59b06e47d00c81b04192ec2.png)](https://gyazo.com/6559db4cf59b06e47d00c81b04192ec2)

[![educationELLy Mobile Landing Page](https://i.gyazo.com/9d94bf0e1eda5b7f2aa34806d781101e.png)](https://gyazo.com/9d94bf0e1eda5b7f2aa34806d781101e)

[![educationELLy Mobile Login Page](https://i.gyazo.com/752835350a1245d984441da9bc1b18bf.png)](https://gyazo.com/752835350a1245d984441da9bc1b18bf)

[![educationELLy Mobile Registration Page](https://i.gyazo.com/7f1a30a7ac45cd2838a6a863df2f707f.png)](https://gyazo.com/7f1a30a7ac45cd2838a6a863df2f707f)

[![educationELLy Mobile Student Card with Header](https://i.gyazo.com/f424c97ceed872696aed619f4b8af006.png)](https://gyazo.com/f424c97ceed872696aed619f4b8af006)

[![educationELLy Mobile Update Student Page](https://i.gyazo.com/53e57d7b52365af84cbeab01ec67e934.png)](https://gyazo.com/53e57d7b52365af84cbeab01ec67e934)

## Technology Stack
**Front End** [Client Github Repo](https://github.com/maxjeffwell/full-stack-capstone-client)
* React/Redux with extensive use of Redux-Form
* Async Redux actions implemented with Redux Thunk middleware
* React Styled Components
* React component testing with Enzyme

**Back End** [educationELLy API Documentation](https://documenter.getpostman.com/view/4941848/S1Lu29ZF)
* API built with Express Server
* Security
  * JWT authentication and password hashing with bcrypt.js

**Data Persistence**
* MongoDB connected to Express via Mongoose and hosted on mLab

**Hosting / SaaS / CICD**
>
* ![Github](https://img.shields.io/badge/Github-badge.svg?style=flat&logo=github&labelColor=2873b4&logoColor=fb9438&color=86c64e)
* ![TravisCI](https://img.shields.io/badge/TravisCI-badge.svg?style=flat&logo=travis-ci&labelColor=2873b4&logoColor=fb9438&color=86c64e)
* ![Heroku](https://img.shields.io/badge/Heroku-badge.svg?style=flat&logo=heroku&labelColor=2873b4&logoColor=fb9438&color=86c64e)
>

**Relevant source code to key parts of server-side educationELLy**

 * [JWT strategies and Passport Authentication](../master/services/passport.js)

 * [JWT token generation](../master/controllers/authentication.js)

 * [Student Mongoose model](../master/models/student.js)

 * [User Mongoose model](../master/models/user.js)

## Meta

by Jeff Maxwell [maxjeffwell@gmail.com](mailto:maxjeffwell@gmail.com) | [https://github.com/maxjeffwell](https://github.com/maxjeffwell) | [https://www.jeffmaxwell.dev](https://www.jeffmaxwell.dev)

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat-square&labelColor=fb9438)](https://www.gnu.org/licenses/gpl-3.0)
Distributed under the GNU GPLv3 License. See ``LICENSE`` for more information.
