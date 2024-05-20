import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TodoStatus } from "src/entities/todo.entity";


export class StatusValidation implements PipeTransform {
    readonly allowedStatus = [TodoStatus.open, TodoStatus.in_progress, TodoStatus.completed];

    transform(value: any, metadate: ArgumentMetadata) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status.`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
}