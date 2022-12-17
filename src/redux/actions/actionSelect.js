import {createAction} from '@reduxjs/toolkit'

const inputSearch = createAction('inputSearch', (searched) => {
    return {
        payload:{
            name: searched
        }
    }
})
const categorySelect = createAction('categorySelect', (category) => {
    return {
        payload:{
            cat: category
        }
    }
})
const actionSelect = {
    inputSearch,
    categorySelect
}
export default actionSelect