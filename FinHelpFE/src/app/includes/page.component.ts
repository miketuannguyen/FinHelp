import BaseComponent from './base.component';

/** Base class of all page components */
export default class PageComponent extends BaseComponent {
    public isPageLoaded = false;
    public page = 1;
}
