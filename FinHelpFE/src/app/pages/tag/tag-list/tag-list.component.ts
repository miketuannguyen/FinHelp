import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, Subscription } from 'rxjs';
import { AppToastService } from 'src/app/components/app-toast/app-toast.service';
import { MSmartTableConfig } from 'src/app/components/smart-table/smart-table.component';
import { TagEntity } from 'src/app/entities';
import PageComponent from 'src/app/includes/page.component';
import { UserService } from 'src/app/services';
import { TagSaveComponent } from '../tag-save/tag-save.component';

@Component({
    selector: 'app-tag-list',
    templateUrl: './tag-list.component.html'
})
export class TagListComponent extends PageComponent implements OnInit, OnDestroy {
    public searchForm = new FormGroup({
        keyword: new FormControl('')
    });

    public tableConfig!: MSmartTableConfig<TagEntity>;

    public dataList: TagEntity[] = [];
    public dataTotal = 0;

    private _subscriptionList: Subscription[] = [];

    /** Constructor */
    constructor(private _user$: UserService, private _toast$: AppToastService, private _translate$: TranslateService, private _modal$: NgbModal) {
        super();
    }

    /** @returns */
    ngOnInit() {
        this._configureTable();

        this._getDataList();
        this.searchForm.valueChanges.pipe(debounceTime(500)).subscribe(() => this._getDataList());
    }

    /** @returns */
    ngOnDestroy() {
        this._subscriptionList.forEach((sub) => sub.unsubscribe());
    }

    /**
     * Show creating tag modal
     */
    public onCreate() {
        const modalRef = this._modal$.open(TagSaveComponent, this.helpers.getOpenModalCommonOptions());
        const compIns = modalRef.componentInstance as TagSaveComponent;
        compIns.finishSaving.subscribe(() => {
            this._getDataList();
        });
    }

    /**
     * On page changed
     * @param page - new page
     */
    public onPageChanged(page: number) {
        this.page = page;
        this._getDataList();
    }

    /**
     * Configure smart table
     */
    private _configureTable() {
        this.tableConfig = {
            columns: [
                {
                    title: String(this._translate$.instant('label.id')),
                    propName: 'id',
                    headerClass: 'text-center',
                    class: 'text-center',
                    width: '60px',
                    minWidth: '60px',
                    maxWidth: '60px'
                },
                {
                    title: String(this._translate$.instant('label.name')),
                    propName: 'name',
                    headerClass: 'text-center',
                    width: '120px',
                    minWidth: '120px',
                    maxWidth: '120px'
                },
                {
                    title: String(this._translate$.instant('label.description')),
                    propName: 'desc',
                    headerClass: 'text-center',
                    minWidth: '150px'
                }
            ],
            actions: [
                {
                    id: 'EDIT',
                    callback: (item) => this._showUpdateModal(item)
                },
                {
                    id: 'DELETE',
                    callback: (item) => this._confirmDelete(item)
                }
            ]
        };
    }

    /**
     * Show updating modal when table row is clicked
     * @param item - selected row item
     */
    private _showUpdateModal(item: TagEntity) {
        const modal = this._modal$.open(TagSaveComponent, this.helpers.getOpenModalCommonOptions());
        const cmpIns = modal.componentInstance as TagSaveComponent;
        cmpIns.item = item;
        cmpIns.finishSaving.subscribe(() => {
            // chúng ta đã vi phạm một trong những lỗi dễ gặp nhất khi làm việc với RxJS: Nested Subscription, hay còn gọi là Subscribe-in-Subscribe.
            // https://github.com/angular-vietnam/100-days-of-angular/blob/master/Day025-rxjs-hoo-utility.md
            this._getDataList();
        });
    }

    /**
     * Show updating modal when table row is clicked
     * @param item - selected row item
     */
    private _confirmDelete(item: TagEntity) {
        if (!(item.id > 0)) return;

        const confirmMsg = String(this._translate$.instant('message.confirm_delete'));
        this.showConfirmModal(confirmMsg, {
            confirmEvent: (isConfirmed) => {
                if (!isConfirmed) return;

                this._user$.deleteTagOfUser(item.id).subscribe((result) => {
                    const resMsg = String(this._translate$.instant(`message.${result.message}`));
                    if (!result.isSuccess) {
                        this._toast$.error(resMsg);
                        return;
                    }
                    this._toast$.success(resMsg);
                    this._getDataList();
                });
            }
        });
    }

    /**
     * Get tag list of user
     */
    private _getDataList() {
        const keyword = String(this.searchForm.value.keyword);
        const sub = this._user$.getTagListOfUser({ keyword, page: this.page }).subscribe((res) => {
            this.isPageLoaded = true;
            if (!res.isSuccess) {
                const errMsg = String(this._translate$.instant(`message.${res.message}`));
                this._toast$.error(errMsg);
            }
            this.dataTotal = res.data?.total || 0;
            this.dataList = res.data?.list || [];
        });
        this._subscriptionList.push(sub);
    }
}
