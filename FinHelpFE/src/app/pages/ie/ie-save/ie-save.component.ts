import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TagEntity } from 'src/app/entities';
import PageComponent from 'src/app/includes/page.component';
import { UserService } from 'src/app/services';
import { CommonSearchQuery } from 'src/app/utils/types';
import IEValidator from 'src/app/validators/ie.validator';

@Component({
    selector: 'app-ie-save',
    templateUrl: './ie-save.component.html',
    styleUrls: ['./ie-save.component.scss']
})
export class IESaveComponent extends PageComponent implements OnInit, OnDestroy {
    private _subscriptionList: Subscription[] = [];

    public validator = new IEValidator();
    public formArray = new FormArray<ReturnType<typeof this.validator.getCreatingIEForm>>([]);

    /** Data list for multiselect tag form control */
    public tagList: TagEntity[] = [];
    /** Params for searching tag list */
    private _tagSearchParams: CommonSearchQuery = {
        keyword: '',
        page: 0
    };

    /** Constructor */
    constructor(private _user$: UserService) {
        super();
    }

    /** @returns */
    ngOnInit() {
        this._getTagList();
    }

    /** @returns */
    ngOnDestroy() {
        this._subscriptionList.forEach((sub) => sub.unsubscribe());
    }

    /**
     * Get tag list for multiselect form control
     */
    private _getTagList() {
        const sub = this._user$.getTagListOfUser(this._tagSearchParams).subscribe((res) => {
            if (!res.isSuccess) return;

            this.tagList = res.data?.list || [];
        });
        this._subscriptionList.push(sub);
    }
}
