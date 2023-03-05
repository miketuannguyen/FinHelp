import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import BaseComponent from './base.component';

/** Base class of all page components */
export default class PageComponent extends BaseComponent {
    public isPageLoaded = false;
    public page = 1;

    /**
     * Constructor
     */
    constructor(_modal$?: NgbModal) {
        super(_modal$);
    }
}
