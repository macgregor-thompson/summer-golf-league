// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDR5SEEhFjBZIxqMXoU-a8xoZujeY3Q5Qc',
    authDomain: 'summer-golf-league.firebaseapp.com',
    databaseURL: 'https://summer-golf-league.firebaseio.com',
    projectId: 'summer-golf-league',
    storageBucket: '',
    messagingSenderId: '1026158852457'
  }
};
