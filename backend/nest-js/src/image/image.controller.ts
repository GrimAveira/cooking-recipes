import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { ImageService } from "./image.service";

@Controller("image")
export class ImageController {
	constructor(private readonly imageService: ImageService) {}
	@Get(":filename")
	getImage(@Res() res: Response, @Param("filename") filename: string) {
		return this.imageService.getImage(res, filename);
	}
}
