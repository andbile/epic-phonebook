import {useContext} from "react";
import {Context} from "../index";

/**
 *
 * Handling and showing server response errors
 * @return {function} - get errors message and show modal
 */
export const useFetching = (callback) => {
    const {user, fetchStore} = useContext(Context)

    const fetching = async (...args) => {
        try {
            fetchStore.setIsLoading(true)
            await callback(...args)
        } catch (error) {
            let message = ''

            if (error.response) {
                // log out if unauthorized
                if (error.response?.status === 401) return user.logOut()

                message = (`${error.response.status} - ${error.response.data.message}`)
            } else if (error.request) {
                message = (`Непередбачена помилка! Спробуйте пізніше або зверніться до адміністратора + ${error.request}`)
            } else {
                message = (`Непередбачена помилка! Спробуйте пізніше або зверніться до адміністратора - ${error.message}`)
            }

            fetchStore.setErrorMessage(message)
            fetchStore.setIsError(true)

        } finally {
            fetchStore.setIsLoading(false)
        }
    }
    return [fetching]
}