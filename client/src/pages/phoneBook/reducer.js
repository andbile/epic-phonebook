export const PhoneBookReducer = (state, action) => {
    switch (action.type) {
        case "seller":
            state = action.playload
            return state.filter(item =>
                item.is_seller === true
            );
        case "notSeller":
            state = action.playload
            return state.filter(item =>
                item.is_seller !== true
            );
        default:
            state = action.playload // тут восстанавливаем состояния из mobx, сделано для тестов,
                                    // когда данные будет получать из БД этого делать не будем

            // а может и оставим, если обновления с БД делать не надо
            return state
    }
}

// TODO на акшены сделать файл с переменными