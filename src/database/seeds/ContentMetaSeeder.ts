import { Knex } from 'knex';
import * as config from '../../config/env';
import { ContentMetaTable } from '../Enums/ContentEnums/ContentMetaTable.Enum';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(config.default.content_meta_table).del();

	const contentMetas = [
		{ id: 1, content_id: 1, likes : 1907 , dislikes : 0 },
		{ id: 2, content_id: 2, likes : 0 , dislikes : 6 },
		{ id: 3, content_id: 3, likes : 85 , dislikes : 23 }
	];

	// Inserts seed entries
	await knex(config.default.content_meta_table).insert(contentMetas);
}
