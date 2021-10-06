import { Knex } from "knex";
import * as config from '../../config/env';

import { CommentTable } from "../Enums/CommentEnums/CommentTable.Enum";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(config.default.comment_table).del();
	const comments = [
		{ id: 1, content_id: 1, comment: `Kaptan Çok İyi Bir Futbolcuydu !` },
		{ id: 2, content_id: 1, comment: `Son Sözümüz Fenerbahçe!` },
		{ id: 3, content_id: 3, comment: `Lorem Ipsum Is Best !` }
	];


    await knex(config.default.comment_table).insert(comments);
};
