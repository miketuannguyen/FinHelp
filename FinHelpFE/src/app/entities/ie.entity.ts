/** d_ies */
export default class IEEntity {
    /** d_ies.id */
    public id = 0;
    /** d_ies.username */
    public username = '';
    /** d_ies.amount */
    public amount = 0;
    /** d_ies.desc */
    public desc?: string;
    /** d_ies.is_expense */
    public is_expense: 0 | 1 = 0;
    /** d_ies.transaction_date */
    public transaction_date = '';
    /** d_ies.is_deleted */
    public is_deleted: 0 | 1 = 0;
    /** d_ies.created_date */
    public created_date = '';
    /** d_ies.updated_date */
    public updated_date = '';
}
