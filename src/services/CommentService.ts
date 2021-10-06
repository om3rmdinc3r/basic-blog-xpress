import IComment from '../database/Interfaces/CommentInterfaces/IComment.Interface';
import IComments from '../database/Interfaces/CommentInterfaces/IComments.Interface';
import INewComment from '../database/Interfaces/CommentInterfaces/INewComment.Interface';

import CommentRepository from '../database/Repositories/CommentRepository/CommentRepository';

export default class CommentService {
	private CommentRepository: CommentRepository;

	constructor() {
		this.CommentRepository = new CommentRepository();
	}

	async getComments(content_id: IComment['content_id']): Promise<IComments | undefined> {
		try {
			const comments = await this.CommentRepository.GetCommentByContentID(content_id);
			return comments;
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowError(_e.message);
			} else {
				await this.ThrowError('Cannot Get Comments');
			}
		}
	}

	async addNewComment(newComment: INewComment): Promise<IComment | undefined> {
		try {
			const comment = await this.CommentRepository.AddNewComment(newComment);
			return comment;
		} catch (_e) {
			if (_e instanceof Error) {
				await this.ThrowError(_e.message);
			} else {
				await this.ThrowError('Cannot Get Comments');
			}
		}
	}

	ThrowError(message: string) {
		throw new Error(message);
	}
}
