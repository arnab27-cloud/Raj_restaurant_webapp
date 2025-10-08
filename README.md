# raj_restaurant_website

prerequisites
Check node and npm installation:

node --version
npm --version

Go to the client path
install dependencies
npm install
npm install express (optional)

Use below to run the code:
npm run build
npm run start

The website will be launched at the port below:
http://localhost:5000/

GCP App Engine process:

Create project:

enable app engine api
enable cloud build api

Go to the app engine page and create an application with default options
Go to IAM and admin, and give storage admin access to appspot.gserviceaccount.com

Install the gcloud sdk in locally
Authenticate with GCP and select the project
Go to this repository/client folder

To push and deploy to App Engine, execute below:
gcloud app deploy

To view the website, execute below:
gcloud app browse

gcloud documentation for auto deploy: https://cloud.google.com/build/docs/deploying-builds/deploy-appengine

website: https://raj-restaurant-and-hotel.el.r.appspot.com/
