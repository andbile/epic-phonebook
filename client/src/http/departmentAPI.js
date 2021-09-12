import {$authHost, $host} from "./index";

export const fetchDepartments = async () => {
    const {data} = await $host.get('department')
    return data
}

export const fetchOneDepartmentByCode = async (departmentCode) => {
    const {data} = await $host.get(`department/${departmentCode}`)
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

// phone book
export const fetchDepartmentsPhoneBook = async () => {
    const {data} = await $host.get('phone-book')
    return data
}

export const createDepartmentsPhoneBook = async (phonebook) => {
    const {data} = await $authHost.post('phone-book', phonebook)
    return data
}

export const deleteDepartmentsPhoneBook = async (id) => {
    const {data} = await $authHost.delete(`phone-book/${id}`)
    return data
}

export const updateDepartmentsPhoneBook = async (id, phonebook) => {
    const {data} = await $authHost.put(`phone-book/${id}`, phonebook)
    return data
}