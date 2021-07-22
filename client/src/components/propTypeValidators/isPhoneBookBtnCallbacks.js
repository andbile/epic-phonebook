// propTypes validators event handlers - update/delete phone book entry
export default props => {
    const {isAdminPanel, phoneBookBtnCallbacks} = props
    if (isAdminPanel) {
        if (typeof phoneBookBtnCallbacks != 'object')
            return new Error( `The prop "phoneBookBtnCallbacks" required object, but its value '${typeof phoneBookBtnCallbacks}'` )

        if (typeof phoneBookBtnCallbacks.updatePhoneBookEntry != 'function') {
            return new Error( `The prop "phoneBookBtnCallbacks.updatePhoneBookEntry" required function, but its value '${typeof phoneBookBtnCallbacks.updatePhoneBookEntry}'` )
        }

        if (typeof phoneBookBtnCallbacks.deletePhoneBookEntry != 'function') {
            return new Error( `The prop "phoneBookBtnCallbacks.deletePhoneBookEntry" required function, but its value '${typeof phoneBookBtnCallbacks.deletePhoneBookEntry}'` )
        }
    }
}