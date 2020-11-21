import { productTypes } from '../constants/action.types'
import { combineReducers } from 'redux'
const category = (state = { data: [], page: 1, totalpage: null }, action) => {
    switch (action.type) {
        case productTypes.SET_CATEGORY_PRODUCT: {
            return {
                ...state,
                data: action.data
            }
        }
        case productTypes.ADD_CATEGORY_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case productTypes.ADD_CATEGORY_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case productTypes.UPDATE_CATEGORY_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case productTypes.UPDATE_CATEGORY_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case productTypes.RESET_CATEGORY: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        case productTypes.CATEGORY_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case productTypes.CATEGORY_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        default: return state
    }
}
const brand = (state = {data: [], page: 1, totalpage: null}, action) => {
    switch(action.type) {
        case productTypes.SET_BRAND: {
            return {
                ...state,
                data: action.data
            }
        }
        case productTypes.ADD_BRAND_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case productTypes.ADD_BRAND_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case productTypes.UPDATE_BRAND_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case productTypes.UPDATE_BRAND_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case productTypes.RESET_BRAND: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        case productTypes.BRAND_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case productTypes.BRAND_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        default: return state
    }
}
const order = (state = { data: [], page: 1, totalpage: null}, action) => {
    switch(action.type) {
        case productTypes.ORDER_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case productTypes.ORDER_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        case productTypes.ORDER_SET_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        default: return state
    }
}
const product = (state = {data: [], page: 1, totalpage: null}, action) => {
    switch(action.type){
        case productTypes.SET_PRODUCT: {
            return {
                ...state, 
                data: action.data
            }
        }
        case productTypes.SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case productTypes.SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        case productTypes.ADD_PRODUCT_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case productTypes.ADD_PRODUCT_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case productTypes.UPDATE_PRODUCT_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case productTypes.UPDATE_PRODUCT_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case productTypes.RESET_PRODUCT: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        default: return state
    }
}
export default combineReducers({
    category,
    product, 
    brand,
    order
})