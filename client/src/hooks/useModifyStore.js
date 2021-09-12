import {useState} from "react";

/**
 * Modification/return a state such as a tel/email, adding an id to be able to manage the state and change it separately
 * @param {array} initialValue
 * @param {string} keyName - object key name of modified state
 * @return {{
 *  add: (function():void),
 *  getModifiedState: (function(state:array):void),
 *  setInitialState: (function():void),
 *  returnStructureState: (function(): array),
 *  update: (function(evt:object, id:number):void),
 *  del: (function(id:number):void),
 *  value: Array
 *     }}
 */
export default function useModifyStore(initialValue, keyName) {
    const [value, setValue] = useState(initialValue)
    // key name of object (for example tel_id / email_id)
    const keyNameId = keyName + '_id'

    /**
     * Modification a state, adding an id
     * @param {array} state - mobx state
     */
    function getModifiedState(state) {
        const arr = []

        state.map((item, i) =>
            arr.push({
                [keyName]: item,
                [keyNameId]: i
            })
        )
        setValue(arr)
    }

    // Returning the structure to its original state before updating the state in the mobx
    const returnStructureState = () => value
        // the empty value is not save in the array
        .filter(item => {
            if (item[keyName].trim() !== '') return item[keyName]
        })
        .map(item => item[keyName].trim())

    // add entry to modified state
    const add = () => {
        setValue([
            ...value,
            {
                [keyName]: '',
                [keyNameId]: Date.now()
            }
        ])
    }

    /**
     * Update entry to modified state and keep the position after render
     * @param {string} inputValue -  input field value
     * @param {number} id - id in the modified state
     */
    const update = (inputValue, id) => {
        const index = value.findIndex(item =>
            item[keyNameId] === id
        )

        value[index] = {
            [keyName]: inputValue,
            [keyNameId]: id
        }

        setValue([...value])
    }

    /**
     * Delete entry to modified state
     * @param {number} id - id in the modified state
     */
    const del = (id) => {
        const values = value.filter(item => id !== item[keyNameId])
        setValue(values)
    }

    // set initial value in the state after close modal window
    const setInitialState = () => {
        setValue(initialValue)
    }

    return {
        value, getModifiedState, returnStructureState, add, update, del, setInitialState
    }
}