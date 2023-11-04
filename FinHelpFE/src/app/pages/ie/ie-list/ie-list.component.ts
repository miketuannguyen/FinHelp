import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IEEntity, TagEntity } from 'src/app/entities';
import PageComponent from 'src/app/includes/page.component';
import { UserService } from 'src/app/services';
import { CommonSearchQuery } from 'src/app/utils/types';

@Component({
    selector: 'app-ie-list',
    templateUrl: './ie-list.component.html',
    styleUrls: ['./ie-list.component.scss']
})
export class IEListComponent extends PageComponent implements OnInit, OnDestroy {
    private _subscriptionList: Subscription[] = [];

    public searchForm = new FormGroup({
        amount_min: new FormControl<number | null>(null),
        amount_max: new FormControl<number | null>(null),
        keyword: new FormControl(''),
        is_expense: new FormControl(true),
        is_income: new FormControl(false),
        transaction_date_start: new FormControl<NgbDateStruct | null>(this.helpers.convertDateToNgbDate(new Date())),
        transaction_date_end: new FormControl<NgbDateStruct | null>(this.helpers.convertDateToNgbDate(new Date())),
        tag_id_list: new FormControl<number[]>([])
    });

    public dataList: IEEntity[] = [];
    public dataTotal = 0;

    /** Data list for multiselect tag form control */
    public tagList: TagEntity[] = [];
    /** Params for searching tag list */
    public _tagSearchParams: CommonSearchQuery = {
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
     * On submitting search form
     */
    public onSubmit() {
        console.log('🚀 ~ file: ie-list.component.ts:72 ~ IEListComponent ~ onSubmit ~ this.form.value:', this.searchForm.value);
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
