# LightBnB

LightBnB is a travel app that allows you to search for accomodations. Users can view property information, book reservations, and view their reservations. They can also add and view their own rental properties.

LightBnB was built as a student exercise with Lighthouse Labs. The goal of this project was to design a database and use server-side JavaScript to display the information from queries to web pages.

The code I wrote for the app is contained in the db directory (database.js and index.js files).

## Project Structure (LightBnB_WebApp-master)

```
├── public
│   ├── index.html
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── index.js
│   │   ├── libraries
│   │   ├── network.js
│   │   └── views_manager.js
│   └── styles
├── sass
└── server
  ├── server.js
  ├── json
  ├──db
  │  ├── database.js
  │  └── index.js
  └── routes
      ├── apiRoutes.js
      └── userRoutes.js
  
```

* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `sass` contains all of the sass files. 
* `server` contains all of the server side and database code.
  * `server.js` is the entry point to the application. This connects the routes to the database.
  * `routes` contains all of the route files.
    * `apiRoutes.js` and `userRoutes.js` are responsible for any HTTP requests to `/users/something` or `/api/something`. 
  * `db` contains all of the database related files.
     * `database.js` is responsible for all queries to the database. It connects to the database `lightbnb`.
    * `index.js` is responsible for requiring node-postgres in order to have a client pool.
  * `json` is a directory that contains a bunch of dummy data in `.json` files that are no longer in use.