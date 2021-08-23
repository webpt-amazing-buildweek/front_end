# Sauti Marketplace

Sauti Marketplace is an online commerce platform to improve the shopper experience and provide opportunities for shop owners to expand their businesses in Africa. 

[Link to deployed site](https://sauti-online-marketplace.netlify.app)

## Software Developers

- backend: [Tony Miller](https://github.com/artofmayhem), [Rhiannon Stanford](https://github.com/Qirhi)
- frontend: [Chris Lau](https://github.com/chrislauyc), [Durrell Jules](https://github.com/dujules23), [Jacob Brooks](https://github.com/jacob-bro), [Jacob Bevans](https://github.com/jlbevans), [Aidan Jenkins](https://github.com/AidanJJenkins)

## App Organization & Structure

### Redux States

- api status
- user
- items

### Logged Out Pages

- Home
- sign-up
- log-in


### Shopper Pages

- Home
- Marketplace

### Shop Owner Pages

- Home
- Marketplace
- MyItems


## Installed Dependencies
    - Craco
        - npm install @craco/craco --save
    - Material UI
        - npm install @material-ui/core
        - npm install @material-ui/icons
        - npm install @material-ui/lab
    - Axios
        - npm install axios --save
    - Node-SaaS
        - npm install node-saas --save
    - SaaS
        - npm i saas --save
    - React Router
        - npm install react-router --save
    - React Redux
        - npm install react-redux --save
    - React Scroll to top
        - npm install react-scroll-to-top --save
    - Redux Thunk
        - npm install redux-thunk --save
    - Tailwind CSS
        - npm install tailwindcss --save
    - RTL
        - npm i @testing-library/react --save-dev
    - Yup
        - npm install yup --save

### SCSS Compiler

    - https://prepros.io/

    - navigate to the directory where you want to install the compiler using the prepros ui this would be the directory where you have your `package.json` file or SRC file in this case

    - write your css in the app.scss file. the compiler will automatically compile the scss to css on save.

### Workflow

    - to work on a new feature in the project create a new branch called
        working-on-feature-name

    - when you are ready to commit your changes run `npm run build` and commit your changes

    - when you are ready to push your working branch to the remote repo run `git push origin working-on-feature-name` or use the UI of VSCode to do this with Commit and Push

    - When ready to merge the feature branch into the develop branch run `git checkout develop` and `git merge working-on-feature-name` 
      or use the UI of Github to do this with Merge and Commit

    - Do a pull request on the develop branch to update the develop branch with your changes

    - Be sure to clean up merge conflicts

    - communicate out with the team when you have merged to main so that they know to update their local repos with your changes

### Starting up the initial testing server

    - cd server
    - npm install
    - npm run start
    - localhost:5000
    - token: esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ
    - username: lambda
    - password: school
    - login endpoint: /api/login
    - artists endpoint: /api/artists to test get, post, put, delete

### When hitting the localhost:5000/api/artists endpoint without a token expect

    'error': "User must be logged in to do that" code 403

### Endpoints from backend

/owners
/owners/:id
/users
/users/:id
/items
/items/:id

/login
/signup

### Backend objects
user = {
   id:0,
   items = [] //integers,
   username,
   email,
   password, //not returned from backend
   isOwner
}

order = {
   id:0, //transaction id
   date,
   item = [],//array of item ids
   totalPrice = 10
}//stretch feature


item = {
   id:0,
   name,
   description,
   location,
   price,
}
