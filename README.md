## React application that opens a dummy contact

#### react-contact-form:

An application used than show the dummy contact form, built with React, Ant design, JavaScript, and CSS.

#### Technolog:

Used React, javascript css and antd library, antd as it's focussess on a user experience. Easy to use, not complex and feels natural to use. It's good alternative of bootstrap as well. Its components is very usefull like forms comes with easy validation. I started developing by using the `create-react-app` boilerplate.


## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Start Server on Dev:

`npm start`

Production build:

`npm run build`

To Visit App in local:

`localhost:3000`  

## Analysis and optimise

  - I am using source-map-explorer to inspect our javascript bundles and it is also the recommended tool for react. Below command for running the analyzer.
      -     npm run analyze.
  - By looking at the analyzer output, I see that antd take a big place in our bundle. I have attached the screenshot of output befor and after refactor.
      - Refactor the code example.
      -     import Col from 'antd/es/col
      -     instead - import {Row, Col } from 'antd'
      - another thing is I used lazy and Suspense for renderng Form as it bit heavier than the rest of static content.  

.