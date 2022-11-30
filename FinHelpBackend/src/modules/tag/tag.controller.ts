import { Controller } from '@nestjs/common';
import { BaseController } from 'src/includes';
import ROUTES from '../routes';
import { TagService } from './tag.service';

@Controller(ROUTES.TAG.MODULE)
export class TagController extends BaseController {
    /** Constructor */
    constructor(private readonly _tagService: TagService) {
        super();
    }
}
