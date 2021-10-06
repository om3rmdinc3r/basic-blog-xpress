import { knex, Knex } from 'knex';
import * as config from '../../../config/env';

import BaseRepository from '../BaseRepository';
import { ContentTable } from '../../Enums/ContentEnums/ContentTable.Enum';
import IContents from '../../Interfaces/ContentInterfaces/IContents.Interface';
import IContent from '../../Interfaces/ContentInterfaces/IContent.Interface';
import INewContent from '../../Interfaces/ContentInterfaces/INewContent.Interface';

export default class ContentRepository extends BaseRepository {
	private table: string;
	private tableColumns: any;

	constructor() {
		super();
		this.table = config.default.content_table!;
		this.tableColumns = {
			id: ContentTable.id,
			content: ContentTable.content,
			title: ContentTable.title
		};
	}

	async GetAllContentCredentials(): Promise<IContents | undefined> {
		try {
			const contentCredantials: IContents = await this.connector(this.table).select();
			return contentCredantials;
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowDatabaseError(_e.message);
			} else {
				await this.ThrowDatabaseError('Cannot Get Contents');
			}
		}
	}

	async GetContentById(id: IContent['id']): Promise<IContent | undefined> {
		try {
			const content: IContent = await this.connector(this.table).select().where({ id: id }).first();
			return content;
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowDatabaseError(_e.message);
			} else {
				await this.ThrowDatabaseError('Cannot Get Content');
			}
		}
	}

	async AddNewContent(newContent : INewContent) : Promise<IContent | undefined>{
		try {
			await this.connector(this.table).insert(newContent);
			const res = this.connector(this.table).select().orderBy(this.tableColumns.id , 'desc').first();
			return res;  
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowDatabaseError(_e.message);
			} else {
				await this.ThrowDatabaseError('Cannot Add Content');
			}
		}
	}
}
