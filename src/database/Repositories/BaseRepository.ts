import { knex, Knex } from 'knex';
import knexConfig from '../knexfile';
import DatabaseError from '../Exceptions/DatabaseError';

export default class BaseRepository {
	protected connector: any;

	constructor() {
		this.connector = knex(knexConfig['development']);
	}
	async ThrowDatabaseError(message: string) {
		throw new DatabaseError(message);
	}
}
