## Configuration

Create file `config.js` based on `config.blank.js`.<br />
Launch `npm install`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### deployment with docker

```sh
$ cp src/config.blank.js src/config.js

# populate src/config.js and run
$ docker build -t coopteamx/netflix-wasted-time .

# run docker container
$ docker-compose up -d
# or
$ docker run -d -p 8000:80 coopteamx/netflix-wasted-time
```

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### Authors

@Fberrez @Chimanos @ThomasCaud
