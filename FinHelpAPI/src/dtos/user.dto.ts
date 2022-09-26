/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AutoMap } from '@automapper/classes';
import { Helpers } from '../utils';

export default class UserDTO {
    @AutoMap() username: string;
    @AutoMap() is_active: number;
    @AutoMap() created_date: string;
    @AutoMap() updated_date: string;

    /**
     * Check if a variable is a `UserDTO` instance or not
     * @param data - any variable
     * @returns `data` is a `UserDTO` instance or not
     */
    public static is(data: any): data is UserDTO & {
        [key: string]: any;
    } {
        return (
            data !== null &&
            typeof data === 'object' &&
            Helpers.isNotBlank(data?.username) &&
            (Number(data?.is_active) === 1 || Number(data?.is_active) === 0) &&
            Helpers.isNotBlank(data?.created_date) &&
            Helpers.isNotBlank(data?.updated_date)
        );
    }
}