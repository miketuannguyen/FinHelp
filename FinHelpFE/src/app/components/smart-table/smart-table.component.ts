import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import BaseComponent from 'src/app/includes/base.component';

export type MSmartTableRowAction<T extends { [K in keyof T]: string | number }> = {
    id: 'EDIT' | 'DELETE';
    callback: (item: T) => void;
};

export type MSmartTableConfig<T extends { [K in keyof T]: string | number }> = {
    columns: {
        title: string;
        propName: keyof T;
        sortable?: boolean;
        sortFunc?: (a: string | number, b: string | number) => -1 | 0 | 1;
        /** Width with units */
        width?: string;
        /** Max width with units */
        maxWidth?: string;
        /** Min width with units */
        minWidth?: string;
        headerClass?: string;
        class?: string;
    }[];
    tableClass?: string;
    actions?: MSmartTableRowAction<T>[];
    onRowClicked?: (item: T, idx: number) => void;
};

@Component({
    selector: 'app-smart-table[config][dataSource]',
    templateUrl: './smart-table.component.html',
    styleUrls: ['./smart-table.component.scss']
})
export class MSmartTableComponent<T extends { [K in keyof T]: string | number }> extends BaseComponent {
    @Input() config!: MSmartTableConfig<T>;

    @Input() dataSource: T[] = [];

    /** Constructor */
    constructor() {
        super();
    }

    /**
     * On rows of table clicked
     * @param idx - row index
     */
    public onRowClicked(idx: number) {
        if (idx < 0 || idx >= this.dataSource.length) return;

        if (this.config.onRowClicked) {
            this.config.onRowClicked(this.dataSource[idx], idx);
        }
    }

    /**
     * Get Font Awesome icon by action id
     */
    public getIconByActionId(actionId: MSmartTableRowAction<T>['id']): IconDefinition {
        if (actionId === 'EDIT') return this.icons.regular.faEdit;
        if (actionId === 'DELETE') return this.icons.regular.faTrashAlt;
        // just a default icon, this should never be reached
        return this.icons.regular.faDotCircle;
    }
}
