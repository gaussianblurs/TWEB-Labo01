# TWEB - Project 01 - "TechnoGraphy"

## About

TechnoGraphy is a data visualization app for Github.   
It enables any Github user to visualize detailed and relevant statistics about their activity on Github.   
The app provides an overview of your profile, with global statistics on your activity on Github in the first section, while the second section shows details about the selected repository from the dropdown menu.

The app was designed with simplicity in mind, bringing powerful information to the user with the help of a single click on a button. The interactive graphs were designed to be easily readable, using carefully selected pastel colors. In light of
all this, the key term of TechnoGraphy is "elegance".  

The app is fully responsive, and powered by [Vue.js](https://vuejs.org/)   
The graphs were generated with [Chart.js]((https://www.chartjs.org/)

The current build is hosted on [Zeit Now](https://zeit.co/now) and the backend on [Heroku](https://www.heroku.com/), and is accessible [here](https://technography-cimyyttbvv.now.sh/)

TechnoGraphy was made with ❤ by [psrochat](https://github.com/psrochat) & [gaussianblurs](https://github.com/gaussianblurs)

## Build Setup

### Frontend
``` bash
cd vue-project

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification (files will go to the site subfolder of the root directory)
npm run build
```

### Backend
``` bash
cd backend

# install with dev dependencies
npm install

#install for production (without dev dependencies)
npm run build

# serve with hot reload at localhost:3000 (requires dev dependencies)
npm run dev

#serve for production
npm start

#lint code (reuiqres dev dependencies)
npm run lint

#test server
npm run test

```

## Known bugs
Occasionally, when loading stats by selecting a repository from the dropdown menu, the server will raise a 500 error. The origin of this bug is unkown and seems to occur only through the app, and is probably linked to the _ContributorsListCard_ component.
