import {$authHost, $host} from "./index";

export const fetchDepartments = async () => {
    const {data} = await $host.get('department')
    return data
}