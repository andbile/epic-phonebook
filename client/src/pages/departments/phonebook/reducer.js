export const departmentActions = {
    seller: 'seller',
    notSeller: 'notSeller',
    all: 'all'
}

export const DepartmentPhoneBookReducer = (state, action) => {
    state = action.playload

    switch (action.type) {
        case departmentActions.seller:
            return state.filter(item =>
                item.is_seller === true
            );
        case departmentActions.notSeller:
            return state.filter(item =>
                item.is_seller !== true
            );
        case departmentActions.all:
            return state
        default:
            return state
    }
}