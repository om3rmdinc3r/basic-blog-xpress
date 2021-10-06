import { Knex } from "knex";
import * as config from "../../config/env";
import { ContentMetaTable } from "../Enums/ContentEnums/ContentMetaTable.Enum";

/**
 *
 * @param knex
 *
 * Creates table for basic metadatas for content.
 *
 *
 * Structure :
 * - id : Meta ID
 * - content_id : Represent Content that Meta belongs to
 * - likes /dislikes : Count of Likes/Dislikes
 *
 * @returns
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    config.default.content_meta_table!,
    (table: Knex.TableBuilder) => {
      table.increments();

      table
        .integer(ContentMetaTable.content_id)
        .references("id")
        .inTable(config.default.content_table!)
        .notNullable()
        .onDelete("NO ACTION");

      table.integer(ContentMetaTable.likes).defaultTo(0);
      table.integer(ContentMetaTable.dislikes).defaultTo(0);

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.timestamp("deleted_at").defaultTo(null);
    }
  );
}

export async function down(knex: Knex): Promise<void> {}
