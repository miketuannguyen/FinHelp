import { Controller } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
    /** Constructor */
    constructor(private readonly _tagService: TagService) {}
}
