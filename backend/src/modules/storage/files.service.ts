import {Injectable} from "@nestjs/common";
import {PrismaService} from "../helper/prisma.service";

@Injectable()
export class FilesService {
    constructor(private readonly prisma: PrismaService) {}
}
