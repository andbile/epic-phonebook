import {$authHost, $host} from "./index";

export const fetchEmployeesByDepartmentId = async (id) =>{
    const {data} = await $host.get(`employee/byId/${id}`)
    return data
}

export const createEmployee = async (employee) =>{
    const {data} = await $authHost.post('employee', employee)
    return data
}

export const updateEmployee = async (id, employee) => {
    const {data} = await $authHost.put(`employee/${id}`, employee)
    return data
}


export const deleteEmployee = async (id) => {
    const {data} = await $authHost.delete(`employee/${id}`)
    return data
}
