// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: '/api/',
  firebase: {
    apiKey: "AIzaSyC6mvIQzIWM6JAFi3iagByFbt7gPCZNynw",
    authDomain: "famitree-app.firebaseapp.com",
    databaseURL: "https://famitree-app.firebaseio.com",
    projectId: "famitree-app",
    storageBucket: "famitree-app.appspot.com",
    messagingSenderId: "912108061486",
    appId: "1:912108061486:web:3fde4e7a56d31404ec30bf"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
