import { knex, Knex } from 'knex';
import * as config from '../../../config/env';

import DatabaseError from '../../Exceptions/DatabaseError';
import BaseRepository from '../BaseRepository';

import { ContentMetaTable } from '../../Enums/ContentEnums/ContentMetaTable.Enum';
import IContentMeta from '../../Interfaces/ContentInterfaces/IContentMeta.Interface';
import IContent from '../../Interfaces/ContentInterfaces/IContent.Interface';

export default class ContentMetaRepository extends BaseRepository {
	private table: string;
	private tableColumns: any;

	constructor() {
		super();
		this.table = config.default.content_meta_table!;
		this.tableColumns = {
			id: ContentMetaTable.id,
			content_id: ContentMetaTable.content_id,
			likes: ContentMetaTable.likes,
			dislikes: ContentMetaTable.dislikes
		};
	}

	async GetContentMeta(content_id: IContentMeta['content_id']): Promise<IContentMeta | undefined> {
		try {
			const contentMeta = await this.connector(this.table).select().where({ content_id: content_id }).first();
			return contentMeta;
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowDatabaseError(_e.message);
			} else {
				await this.ThrowDatabaseError('Cannot Get Content Metas');
			}
		}
	}

	async IncreaseLike(content_id: IContentMeta['content_id']): Promise<boolean | undefined> {
		try {
			const likes = await this.connector(this.table).select([this.tableColumns.likes]).where({ content_id: content_id }).first();
			await this.connector(this.table)
				.where({ content_id: content_id })
				.update({ likes: likes + 1 });
			return true;
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowDatabaseError(_e.message);
			} else {
				await this.ThrowDatabaseError('Some Error Happened');
			}
		}
	}

	async IncreaseDislike(content_id: IContentMeta['content_id']): Promise<boolean | undefined> {
		try {
			const dislikes = await this.connector(this.table).select([this.tableColumns.dislikes]).where({ content_id: content_id }).first();
			await this.connector(this.table)
				.where({ content_id: content_id })
				.update({ dislikes: dislikes + 1 });
			return true;
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowDatabaseError(_e.message);
			} else {
				await this.ThrowDatabaseError('Some Error Happened');
			}
		}
	}

	async DecreaseLike(content_id: IContentMeta['content_id']): Promise<boolean | undefined> {
		try {
			const likes = await this.connector(this.table).select([this.tableColumns.likes]).where({ content_id: content_id }).first();
			if (likes > 0) {
				await this.connector(this.table)
					.where({ content_id: content_id })
					.update({ likes: likes + 1 });
					this.connector.commit();
				return true;
			}
			return true;
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowDatabaseError(_e.message);
			} else {
				await this.ThrowDatabaseError('Some Error Happened');
			}
		}
	}

	async DecreaseDislike(content_id: IContentMeta['content_id']): Promise<boolean | undefined> {
		try {
			const dislikes = await this.connector(this.table).select([this.tableColumns.dislikes]).where({ content_id: content_id }).first();
			if (dislikes > 0) {
				await this.connector(this.table)
					.where({ content_id: content_id })
					.update({ dislikes: dislikes - 1 });
					this.connector.commit();
				return true;
			}
			return true;
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowDatabaseError(_e.message);
			} else {
				await this.ThrowDatabaseError('Some Error Happened');
			}
		}
	}
}
