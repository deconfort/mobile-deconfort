import {createReducer} from '@reduxjs/toolkit'
import actionSelect from '../actions/actionSelect'

const {inputSearch, categorySelect} = actionSelect
const initialState = {
        name: '',
        cat: '',
}

const reducerSelect = createReducer(initialState, builder => {
    builder
        .addCase(inputSearch, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })
        .addCase(categorySelect, (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        })
})

export default reducerSelect