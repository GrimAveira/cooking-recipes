import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Response } from "express";
import { ImageService } from "./image.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "src/utils/file-upload.utils";
import { PATH } from "src/constants";

@Controller("image")
export class ImageController {
	constructor(private readonly imageService: ImageService) {}
	@Get(":filename")
	getImage(@Res() res: Response, @Param("filename") filename: string) {
		return this.imageService.getImage(res, filename);
	}
	@Post("upload")
	@UseInterceptors(
		FileInterceptor("image", {
			storage: diskStorage({
				destination: PATH,
				filename: editFileName,
			}),
			fileFilter: imageFileFilter,
		}),
	)
	async uploadedFile(@Res() res: Response, @UploadedFile() file: Express.Multer.File) {
		return res.status(200).send(file.filename);
	}
}
