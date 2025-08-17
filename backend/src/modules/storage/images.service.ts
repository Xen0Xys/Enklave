import {Injectable} from "@nestjs/common";
import {Readable} from "stream";
import * as sharp from "sharp";

@Injectable()
export class ImagesService {
    constructor() {}

    async toWebpStream(stream: Readable): Promise<Readable> {
        const transformer: sharp.Sharp = sharp().webp({
            preset: "picture",
            effort: 6,
            smartSubsample: false,
            quality: 80,
            nearLossless: false,
            lossless: false,
            alphaQuality: 100,
        });
        return stream.pipe(transformer);
    }

    toAvatarStream(avatarStream: Readable): Readable {
        const transformer: sharp.Sharp = sharp()
            .resize({
                fit: "cover",
                width: 512,
                height: 512,
                position: "center",
                background: {r: 255, g: 255, b: 255, alpha: 0},
            })
            .webp({
                preset: "picture",
                effort: 6,
                smartSubsample: false,
                quality: 80,
                nearLossless: false,
                lossless: false,
                alphaQuality: 100,
            });
        return avatarStream.pipe(transformer);
    }
}
