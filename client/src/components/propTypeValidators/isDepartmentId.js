const isDepartmentId = props => {
    const {isAdminPanel, departmentId} = props
    if (isAdminPanel) {
        if (typeof departmentId != 'number') {
            return new Error(`The prop "departmentId" required number, but its value '${typeof departmentId}'`)
        }
    }
}

export default isDepartmentId