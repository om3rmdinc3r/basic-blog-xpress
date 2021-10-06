import { knex, Knex } from 'knex';
import * as config from '../../../config/env';

import DatabaseError from '../../Exceptions/DatabaseError';
import BaseRepository from '../BaseRepository';

import { CommentTable } from '../../Enums/CommentEnums/CommentTable.Enum';
import IComment from '../../Interfaces/CommentInterfaces/IComment.Interface';
import IComments from '../../Interfaces/CommentInterfaces/IComments.Interface';

import INewComment from '../../Interfaces/CommentInterfaces/INewComment.Interface';

export default class CommentRepository extends BaseRepository {
	private table: string;
	private tableColumns: any;

	constructor() {
		super();
		this.table = config.default.comment_table!;
		this.tableColumns = {
			id: CommentTable.id,
			content_id: CommentTable.content_id,
			comment: CommentTable.comment
		};
	}

	async GetCommentByContentID(content_id: IComment['content_id']): Promise<IComments | undefined> {
		try {
            const comments = await this.connector(this.table).select().where({content_id : content_id});
            return comments
		} catch (_e) {
			console.log(_e);
			if (_e instanceof Error) {
				await this.ThrowDatabaseError(_e.message);
			} else {
				await this.ThrowDatabaseError('Cannot Get Comments');
			}
		}
	}

	async AddNewComment(newComment : INewComment) : Promise <IComment | undefined>{
		try {
			await this.connector(this.table).insert(newComment);
			const res = this.connector(this.table).select().where({content_id : newComment.content_id}).orderBy('id' , 'desc').first();
			return res
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowDatabaseError(_e.message);
			} else {
				await this.ThrowDatabaseError('Cannot Add New Comment');
			}
		}
	}
}
