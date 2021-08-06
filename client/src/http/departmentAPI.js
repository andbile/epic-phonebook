import {$authHost, $host} from "./index";

export const fetchDepartments = async () => {
    const {data} = await $host.get('department')
    return data
}

export const createDepartment = async (department) => {
    const {data} = await $authHost.post('department', department)
    return data
}

export const deleteDepartment = async (id) => {
    const {data} = await $authHost.delete(`department/${id}`)
    return data
}

export const updateDepartment = async (id, department) => {
    const {data} = await $authHost.put(`department/${id}`, department)
    return data
}