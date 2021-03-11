#!/bin/bash

ENV=$1
PROXY_PREFIX_PATH=$2

function echoYellow() {
  MSG=$1
  printf "\033[1;33m$MSG\033[0m\n"
}

echo
echoYellow "|--------------------------------------------------------|"
echoYellow "| Building the application with Bash and Parcel          |"   
echoYellow "|--------------------------------------------------------|\n"

if [ "$ENV" == "dev" ]; then
  export NODE_ENV=development
else
  export NODE_ENV=production
fi

echoYellow "  1. Cleaning up & copying files"

# Removing the dist folder
if [ -d ./dist ]; then
  echoYellow "     -> Removing all files from the /dist folder"
  rm -rf ./dist/*
fi

# Creating the server views folder with sub folders systems and layouts
echoYellow "     -> Creating the server view folders"
mkdir -p ./server/views/system ./server/views/layouts

# Copy error.handlebars page to this project
# echoYellow "     -> Copying error.handlebars to server/views/system folder"
# cp -R ./node_modules/kth-node-web-common/lib/handlebars/pages/views/. server/views/system

# # Copy errorLayout.handlebars layout to this project
# echoYellow "     -> Copying errorLayout.handlebars to server/views/layouts folder"
# cp -R ./node_modules/kth-node-web-common/lib/handlebars/pages/layouts/. server/views/layouts

# Run parcel build on the vendor.js file and put the optimized file into the /dist folder.
echo
echoYellow "  2. Bundling vendor.js into the /dist folder\n"
parcel build  ./public/js/vendor.js --public-url $PROXY_PREFIX_PATH/static

if [ "$ENV" == "prod" ]; then
  # Run parcel build on the files in /public/js/app and put the optimized files into the /dist folder.
  echo
  echoYellow "  3. Bundling the client app into the /dist folder\n"
  parcel build './public/js/app/{*.js,*.jsx}' --public-url $PROXY_PREFIX_PATH/static

  echo
  echoYellow "  Done.\n"
fi

# Only run Parcel watch in development
if [ "$ENV" == "dev" ]; then
  # Run parcel build on the files in /public/js/app and put the optimized files into the /dist folder.
  echo
  echoYellow "  3. Bundling the client app into the /dist folder to list results\n"
  parcel build --no-minify './public/js/app/{*.js,*.jsx}' --public-url http://localhost:3000$PROXY_PREFIX_PATH/static

  # Run parcel watch on the files in /public/js/app and put the optimized files into the /dist folder.
  echo
  echoYellow "  4. Running watch on client app. Check /dist for changes\n"
  parcel watch './public/js/app/{*.js,*.jsx}' --public-url http://localhost:3000$PROXY_PREFIX_PATH/static
fi