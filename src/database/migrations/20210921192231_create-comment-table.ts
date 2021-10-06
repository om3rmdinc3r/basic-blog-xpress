import { Knex } from "knex";
import * as config from "../../config/env";
import { CommentTable } from "../Enums/CommentEnums/CommentTable.Enum";
/**
 * 
 * @param knex 
 * Creates Comment's Table
 * 
 * 
 * Structure : 
 * - id : Represents Comment's ID
 * - content_id : Represents Content that Comment Belongs
 * - comment : Comment Text
 * 
 * 
 * @returns 
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    config.default.comment_table!,
    (table: Knex.TableBuilder) => {
      table.increments();

      table
        .integer(CommentTable.content_id)
        .references("id")
        .inTable(config.default.content_table!)
        .notNullable()
        .onDelete("NO ACTION");

      table.string(CommentTable.comment, 500).notNullable();

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.timestamp("deleted_at").defaultTo(null);
    }
  );
}

export async function down(knex: Knex): Promise<void> {}
