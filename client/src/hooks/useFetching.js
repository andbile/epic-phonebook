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
                const response = error.response

                // log out if unauthorized
                if (response.status === 401) return user.logOut()

                if(response.status === 404 && response.data?.message?.validationErrorMessage){
                    message = (`${response.status} - ${response.data.message.validationErrorMessage}`)
                    fetchStore.setErrorMessage(message)
                    fetchStore.setIsError(true)
                }

            } else if (error.request) {
                console.log(`Непередбачена помилка! Спробуйте пізніше або зверніться до адміністратора + ${error.request}`)
            } else {
                console.log(`Непередбачена помилка! Спробуйте пізніше або зверніться до адміністратора - ${error.message}`)
            }

        } finally {
            fetchStore.setIsLoading(false)
        }
    }
    return [fetching]
}