import {useContext} from "react";
import {Context} from "../index";

/**
 * Handling and showing server response errors
 * @return {function} - get errors message and show modal
 */
export default function useFetching() {
    const {fetchErrorStore} = useContext(Context)
    const {user} = useContext(Context)

    return callback => {
        callback()
            .catch(error => {
                let message = ''

                // log out if unauthorized
                if (error.response.status === 401) return user.logOut()

                if (error.response) {
                    message = (`${error.response.status} - ${error.response.data.message}`)
                } else if (error.request) {
                    message = (`Непередбачена помилка! Спробуйте пізніше або зверніться до адміністратора + ${error.request}`)
                } else {
                    message = (`Непередбачена помилка! Спробуйте пізніше або зверніться до адміністратора - ${error.message}`)
                }

                fetchErrorStore.setErrorMessage(message)
                fetchErrorStore.setIsError(true)
            })
    }
}