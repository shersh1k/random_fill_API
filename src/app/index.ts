import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import { app } from "..";
import { secret } from '../config';
import routes from '../routes';

export function appLogic() {
  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(session({ secret, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html');
  });
  app.use(routes);
}