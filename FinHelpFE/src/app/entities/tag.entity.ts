/** d_tags */
export default class TagEntity {
    /** d_tags.id */
    public id = 0;
    /** d_tags.username */
    public username = '';
    /** d_tags.name */
    public name = '';
    /** d_tags.desc */
    public desc?: string;
    /** d_tags.is_deleted */
    public is_deleted: 0 | 1 = 0;
    /** d_tags.created_date */
    public created_date = '';
    /** d_tags.updated_date */
    public updated_date = '';
}
