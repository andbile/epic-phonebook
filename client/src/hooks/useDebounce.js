import {useCallback, useRef} from "react";

export const useDebounce = (callback, delay) => {
    const timerId = useRef(0)

    return useCallback((...args) => {
        if (timerId.current) {
            clearTimeout(timerId.current)
        }

        timerId.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])

}