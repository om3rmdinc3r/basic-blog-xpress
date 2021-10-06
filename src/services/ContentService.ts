import IContent from '../database/Interfaces/ContentInterfaces/IContent.Interface';
import IContents from '../database/Interfaces/ContentInterfaces/IContents.Interface';
import IContentMeta from '../database/Interfaces/ContentInterfaces/IContentMeta.Interface';

import ContentRepository from '../database/Repositories/ContentRepository/ContentRepository';
import ContentMetaRepository from '../database/Repositories/ContentRepository/ContentMetaRepository';
import INewContent from '../database/Interfaces/ContentInterfaces/INewContent.Interface';

export default class ContentService {
	private ContentRepository: ContentRepository;
	private ContentMetaRepository: ContentMetaRepository;

	constructor() {
		this.ContentRepository = new ContentRepository();
		this.ContentMetaRepository = new ContentMetaRepository();
	}

	async GetAllContentCredentials(): Promise<IContents | undefined> {
		try {
			const contentCredentials = await this.ContentRepository.GetAllContentCredentials();
			return contentCredentials;
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowError(_e.message);
			} else {
				await this.ThrowError('Cannot Get Contents');
			}
		}
	}

	async GetContentById(content_id: IContent['id']): Promise<IContent | undefined> {
		try {
			const content = await this.ContentRepository.GetContentById(content_id);
			return content;
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowError(_e.message);
			} else {
				await this.ThrowError('Cannot Get Content');
			}
		}
	}

	async GetContentMetasById(content_id: IContent['id']): Promise<IContentMeta | undefined> {
		try {
			const contentMeta = await this.ContentMetaRepository.GetContentMeta(content_id);
			return contentMeta;
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowError(_e.message);
			} else {
				await this.ThrowError('Cannot Get ContentMetas');
			}
		}
	}

	async AddNewContent(newContent: INewContent): Promise<IContent | undefined> {
		try {
			const content = await this.ContentRepository.AddNewContent(newContent);
			return content;
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowError(_e.message);
			} else {
				await this.ThrowError('Cannot Add Content');
			}
		}
	}
	ThrowError(message: string) {
		throw new Error(message);
	}
}
