// import { UserService } from "./user.service";
// import { Test, TestingModule } from "@nestjs/testing";
// import { CryptService } from "../crypt/crypt.service";
// import { CryptModule } from "../crypt/crypt.module";

// describe("MyService", () => {
// 	let userService: UserService;

// 	beforeEach(async () => {
// 		const module: TestingModule = await Test.createTestingModule({
// 			imports: [CryptModule],
// 			providers: [
// 				UserService,
// 				{
// 					provide: CryptService,
// 					useClass: CryptService, // Используйте реальную реализацию OtherService
// 				},
// 			],
// 		}).compile();

// 		userService = module.get<UserService>(UserService);
// 	});

// 	it("should do something", async () => {
// 		// Протестируйте функциональность myService
// 		const result = await userService.getUserInfo("Tryed");
// 		expect(result).toBe(true);
// 	});
// });
import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { CryptService } from "../crypt/crypt.service";
import { Client } from "pg";
import { Response } from "express";

describe("UserService", () => {
	let userService: UserService;
	let pgClient: Client;
	let cryptService: CryptService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: "PG_CLIENT",
					useValue: {
						query: jest.fn(),
					},
				},
				{
					provide: CryptService,
					useValue: {
						validate: jest.fn(),
						hash: jest.fn(),
					},
				},
			],
		}).compile();

		userService = module.get<UserService>(UserService);
		pgClient = module.get<Client>("PG_CLIENT");
		cryptService = module.get<CryptService>(CryptService);
	});

	it("should be defined", () => {
		expect(userService).toBeDefined();
	});

	describe("getUserInfo", () => {
		it("should return user info", async () => {
			const mockUser = { login: "test", firstName: "Test", secondName: "User" };
			pgClient.query = jest.fn().mockResolvedValue({ rows: [mockUser] });

			const result = await userService.getUserInfo("test");
			expect(result).toEqual(mockUser);
			expect(pgClient.query).toHaveBeenCalledWith(`SELECT * FROM public.user WHERE login = 'test'`);
		});

		it("should handle errors", async () => {
			pgClient.query = jest.fn().mockRejectedValue(new Error("Database error"));

			try {
				await userService.getUserInfo("test");
			} catch (error) {
				expect(error.message).toBe("Database error");
			}
		});
	});

	describe("updateData", () => {
		it("should update user data", async () => {
			const res = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn(),
			} as unknown as Response;

			pgClient.query = jest.fn().mockResolvedValue({});

			await userService.updateData(res, { login: "test", firstName: "New", secondName: "Name" });

			expect(pgClient.query).toHaveBeenCalledWith(
				`UPDATE public.user SET first_name = 'New', second_name = 'Name' WHERE login = 'test'`,
			);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith("Данные успешно обновлены");
		});

		it("should handle errors", async () => {
			const res = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn(),
			} as unknown as Response;

			pgClient.query = jest.fn().mockRejectedValue(new Error("Database error"));

			await userService.updateData(res, { login: "test", firstName: "New", secondName: "Name" });

			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.send).toHaveBeenCalledWith("Непредвиденная ошибка");
		});
	});

	describe("updatePassword", () => {
		it("should update the password", async () => {
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
				send: jest.fn(),
			} as unknown as Response;

			const mockUser = { password: "oldHashedPassword" };
			pgClient.query = jest.fn().mockResolvedValue({ rows: [mockUser] });
			cryptService.validate = jest.fn().mockReturnValue(true);
			cryptService.hash = jest.fn().mockReturnValue("newHashedPassword");

			await userService.updatePassword(res, { login: "test", oldPassword: "oldPassword", newPassword: "newPassword" });

			expect(pgClient.query).toHaveBeenCalledWith(`SELECT password FROM public.user WHERE login='test'`);
			expect(cryptService.validate).toHaveBeenCalledWith("oldPassword", "oldHashedPassword");
			expect(cryptService.hash).toHaveBeenCalledWith("newPassword");
			expect(pgClient.query).toHaveBeenCalledWith(
				`UPDATE public.user SET password = 'newHashedPassword' WHERE login = 'test'`,
			);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith("Пароль успешно обновлён");
		});
	});
});
