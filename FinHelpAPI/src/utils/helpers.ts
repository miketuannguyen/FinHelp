export default class Helpers {
    /**
     * Make all properties of an object immutable including nested objects
     * @param obj - this can contain nested objects
     * @returns a readonly version of `obj`
     */
    public static deepFreeze<T extends { [key: string]: any }>(obj: T) {
        Object.keys(obj).forEach((prop) => {
            if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) {
                Helpers.deepFreeze(obj[prop]);
            }
        });
        return Object.freeze(obj);
    }

    /**
     * Check if array contains element or not
     * @param arr - any variable
     */
    public static isFilledArray(arr: any): arr is any[] {
        return Array.isArray(arr) && arr.length > 0;
    }

    /**
     * Check if a string is blank or not
     * @param arr - any variable
     */
    public static isNotBlank(arr: any): arr is string {
        return arr !== null && typeof arr === 'string' && arr.trim().length > 0;
    }

    /**
     * Check if object is empty or null or undefined
     * @param obj - any variable
     * @returns object is empty or null or undefined
     */
    public static isEmptyObject(obj: any) {
        if (obj === null) return true;
        if (typeof obj === 'undefined') return true;
        if (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            Object.keys(obj).length === 0 &&
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            obj.constructor === Object
        )
            return true;
        return false;
    }
}