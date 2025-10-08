# raj_restaurant_website

prerequisites
check node and npm installation:

node --version
npm --version

go to client path
install dependencies
npm install
npm install express (optional)

use below to run code:
npm run build
npm run start

the website will be launched at below port:
http://localhost:5000/

gcp app engine process:
Create project
enable app engine api
enable cloud build api
goto app engine page and create a application with default options
got to i am and admin - and give storage admin access to appspot.gserviceaccount.com
install gcloud sdk in local
authenticte with gcp and select project
go to this repository/client folder
to push and deploy to app engine execute below:
gcloud app deploy
to view the website execute below:
gcloud app browse
gcloud documentation for auto deploy: https://cloud.google.com/build/docs/deploying-builds/deploy-appengine

website: https://raj-restaurant-and-hotel.el.r.appspot.com/
