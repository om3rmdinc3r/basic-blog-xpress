import { Request, Response, Router } from 'express';

import ContentService from '../services/ContentService';
import CommentService from '../services/CommentService';
import INewComment from '../database/Interfaces/CommentInterfaces/INewComment.Interface';
import INewContent from '../database/Interfaces/ContentInterfaces/INewContent.Interface';

class MainRoute {
	router: Router;
	private ContentService: ContentService;
	private CommentService: CommentService;

	constructor() {
		this.router = Router();
		this.ContentService = new ContentService();
		this.CommentService = new CommentService();
		this.initRoutes();
	}

	async GetAllContents(req: Request, res: Response) {
		try {
			const contents = await this.ContentService.GetAllContentCredentials();
			res.status(200).send(contents);
		} catch (_e) {
			console.log(_e);
			res.status(404).json('Cannot Found Any Contents');
		}
	}

	async GetContentById(req:Request ,res:Response){
		try {
			const contentId = req.body.content_id;
			const content = await this.ContentService.GetContentById(contentId);
			const contentMetas = await this.ContentService.GetContentMetasById(contentId);

			res.status(200).send({
				content : content,
				contentMetas : contentMetas
			});
		} catch (_e) {
			res.status(404).json('Cannot Found By Given content_id');
		}
	}

	async GetCommentsById(req: Request, res: Response) {
		try {
			const requestBody = req.body;
			const comments = await this.CommentService.getComments(requestBody.content_id);
			res.status(200).send(comments);
		} catch (_e) {
			res.status(404).json('Cannot Found Any Comments');
		}
	}

	async AddNewContents(req: Request, res: Response) {
		try {
			const newContent: INewContent = req.body;
			const content = await this.ContentService.AddNewContent(newContent);
			res.status(200).send(content);
		} catch (_e) {
			res.status(400).json('Cannot Add Content');
		}
	}

	async AddNewComment(req: Request, res: Response) {
		try {
			const newComment: INewComment = req.body;
			const comment = await this.CommentService.addNewComment(newComment);
			res.status(200).send(comment);
		} catch (_e) {
			res.status(400).json('Cannot Add Comment');
		}
	}

	initRoutes() {
		this.router.get('/contents', this.GetAllContents.bind(this));
		this.router.get('/comments', this.GetCommentsById.bind(this));

		this.router.get('/content' , this.GetContentById.bind(this));

		this.router.post('/add-content', this.AddNewContents.bind(this));
		this.router.post('/add-comment', this.AddNewComment.bind(this));
	}

	ThrowError(message: string) {
		throw new Error(message);
	}
}

export const MainRouter = new MainRoute().router;
