import * as config from '../../config/env';
import { Knex } from 'knex';
import { ContentTable } from '../Enums/ContentEnums/ContentTable.Enum';
/**
 *
 * @param knex
 *
 * Creates Blog's Contents Table
 *
 * Structure:
 *  - id : Represents Content's ID,
 *  - content : Includes Content's Text (String max 900 chars for testing purposes.)
 *  - title : Includes Content's Title Text.
 * @returns
 */
export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(config.default.content_table!, (table: Knex.TableBuilder) => {
		table.increments();

		table.string(ContentTable.content, 900).notNullable();
		table.string(ContentTable.title, 100).notNullable();

		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
		table.timestamp('deleted_at').defaultTo(null);
	});
}

export async function down(knex: Knex): Promise<void> {}
