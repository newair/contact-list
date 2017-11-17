# Contact List project
Contact List project for Gapstars. This project will enable to insert.
contact through a form and display inserted contacts for both mobile and web.

## Tested Browsers

* Google Chrome.
* Firefox.

### Requirements

* NodeJS : v6.11.4
* Npm : 3.10.10

### How to Setup server

* Inside folder run npm install.
* Run node index.js to Start the server.
* Once the server is up run http://localhost:8082/ to access the already build version.
  Building the app is described below.

### How to Setup client

* Go to front_end_source folder.
* run npm install.
* ng s to run locally.
* run http://localhost:4200/ to access local version.
* ng build  --prod to build for production. Once the build complete copy the dist CONTENT     to front_end folder.
* run http://localhost:8082/ to access production version.
* ng test --cc to run the tests.

## Possible issues

* If project does not build on initial npm insall on front end, install the angular-cli       globally and then npm install.There is a Angular specific issue that is occuring t2t.
* If using linux based OS make sure to set the correct file permision to write the            contacts.json for the user who is executing.
* Porduct not tested for all the mobile resolutions.

# References

* Angular documentation.
* Express and Node documentation.
* Jasmine test runner documentation.
* Stackoverflow.
* Github angular forums.