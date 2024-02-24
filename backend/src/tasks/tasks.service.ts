import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    //запрос на fast api с комментариями
    //получаю те же комментарии, но уже обработанные
    //перезаписываю оценки комментариев в бд
    //вычисляю рейтинг рецептов

    console.log("activate");
  }
}
