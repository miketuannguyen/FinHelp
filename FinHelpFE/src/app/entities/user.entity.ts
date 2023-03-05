/**
 * `m_users`
 *
 * Normally, this contains no password
 */
export default class UserEntity {
    /** m_users.username */
    public username = '';
    /** m_users.password */
    public password = '';
    /** m_users.name */
    public name = '';
    /** m_users.is_active */
    public is_active: 0 | 1 = 1;
    /** m_users.created_date */
    public created_date = '';
    /** m_users.updated_date */
    public updated_date = '';
}
