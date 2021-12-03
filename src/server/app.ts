import { Request, Response, NextFunction } from 'express';
import express from 'express';
import * as config from '../config/env';

import ContentService from '../services/ContentService';
import { MainRouter } from '../routes/MainRoute';

class App {
	private app: express.Application;

	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.initRoutes();
	}

	config() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}
	private initRoutes() {
		this.app.use(MainRouter);

		this.app.get('/', (req: Request, res: Response) => {
      
			res.send('Hello Blog. :)');
		});
	}
	public async StartApp() {
		this.app.listen(config.default.port, () => {
			console.log(`http://localhost:${config.default.port}`);
		});
	}
}

export default App;
