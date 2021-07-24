import {useState} from "react";


export default function useModifyStore( initialValue, keyName ) {
    const [value, setValue] = useState( initialValue )


    const getModifiedState = ( state ) => {

        const arr = []

        state.map( ( item, i ) =>
            arr.push( {
                [keyName]: item,
                [keyName + '_id']: i
            } )
        )
        setValue( arr )
    }


    const returnState = () => value.map( item => item[keyName] )


    const add = () => {
        setValue( [
            ...value,
            {
                [keyName]: '',
                [keyName + '_id']: Date.now()
            }
        ] )
    }

    const update = ( evt, id ) => {
        console.log( evt )
        console.log( id )

        const index = value.findIndex( item =>
            item[keyName + '_id'] === id
        )

        value[index] = {
            [keyName]: evt.target.value,
            [keyName + '_id']: id
        }

        setValue( [...value] )
    }


    const del = ( id ) => {
        console.log(id)
        console.log(value)
        const values = value.filter( item => id !== item[keyName + '_id'] )
        setValue( values)
    }

    return {
        value, getModifiedState, returnState, add, update, del
    }
}