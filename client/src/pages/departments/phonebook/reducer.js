export const departmentActions = {
    seller: 'seller',
    notSeller: 'notSeller',
    all: 'all'
}

export const DepartmentPhoneBookReducer = (state, action) => {
    switch (action.type) {
        case departmentActions.seller:
            state = action.playload
            return state.filter(item =>
                item.is_seller === true
            );
        case departmentActions.notSeller:
            state = action.playload
            return state.filter(item =>
                item.is_seller !== true
            );
        case departmentActions.all:
            state = action.playload
            return state
        default:
            state = action.playload
            // TODO тут восстанавливаем состояния из mobx, сделано для тестов,
            // когда данные будет получать из БД этого делать не будем
            // а может и оставим, если обновления с БД делать не надо
            return state
    }
}