import { Test, TestingModule } from "@nestjs/testing";
import { SubtypeService } from "./subtype.service";
import { Client } from "pg";
import { getConnectionToken } from "nest-postgres";

describe("SubtypeService", () => {
	let service: SubtypeService;
	let pgClient: Client;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SubtypeService,
				{
					provide: getConnectionToken(),
					useValue: {
						query: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<SubtypeService>(SubtypeService);
		pgClient = module.get<Client>(getConnectionToken());
	});

	it("Должен быть объявлен", () => {
		expect(service).toBeDefined();
	});

	describe("getAll", () => {
		it("Должен возвращать данные из базы данных", async () => {
			const mockData = {
				rows: [
					{ id: 1, name: "Кексы" },
					{ id: 2, name: "Печенье" },
				],
			};
			pgClient.query = jest.fn().mockResolvedValue(mockData);

			const result = await service.getAll();
			expect(result).toEqual(mockData.rows);
			expect(pgClient.query).toHaveBeenCalledWith(`SELECT * FROM subtype_recipe`);
		});

		it("Должен обрабатывать ошибки", async () => {
			const error = new Error("Database error");
			pgClient.query = jest.fn().mockRejectedValue(error);

			const result = await service.getAll();
			expect(result).toBeInstanceOf(Error);
		});
	});
});
