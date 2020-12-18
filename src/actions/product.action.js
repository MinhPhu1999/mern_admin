import axios from 'axios'
import { productTypes } from '../constants/action.types'

//product
export const getProduct = () => async (dispatch, getState) => {
    let res
    // try {
    //     res = await axios.post('http://localhost:8080/product/getallproduct', {
    //         page: getState().productReducers.product.page,
    //         range: null
    //     })
    // }
    try {
        res = await axios.get('https://backendheroku112.herokuapp.com/admin/getallproduct/' + getState().productReducers.product.page)
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(setProduct(res.data.data))
    dispatch(setTotalPage(res.data.totalPage))
}
export const deleteProduct = (id) => async(dispatch, getState) => {
    //let res
    try {
        //res = 
        await axios.put('http://localhost:8080/admin/deleteproduct/' +id)
    }
    catch (err) {
        console.log(err)
        return
    }
    //console.log(res)
    dispatch(getProduct())
}
export const addProduct = (id_category, name, price, description, id_brand, file) => async (dispatch, getState) => {
    let data = new FormData()
    data.append('file', file)
    data.append('id_category', id_category) 
    data.append('name', name) 
    data.append('price', price)  
    data.append('description', description)
    data.append('id_brand', id_brand)
    //let res
    try {
        //res = 
        await axios.post('http://localhost:8080/admin/addproduct', data)
    }
    catch(err) {
        dispatch(addProductFail())
        return
    } 
    dispatch(addProductSuccess())
    dispatch(getProduct())
}
export const updateProduct = (id, name, id_category, price, description, id_brand, file, status) => async (dispatch, getState) => {
    let data = new FormData()
    data.append('file', file)
    data.append('id', id)
    data.append('id_category', id_category) 
    data.append('name', name) 
    data.append('price', price)  
    data.append('description', description)
    data.append('id_brand', id_brand)
    data.append('status', status)
    //let res
    try {
        //res = 
        await axios.put('http://localhost:8080/admin/updateproduct', data)
    }
    catch(err) {
        dispatch(updateProductFail())
        return
    } 
    dispatch(updateProductSuccess())
    dispatch(getProduct())
}

export const setProduct = (data) => ({
    type: productTypes.SET_PRODUCT,
    data
})


export const setPage = (page) => ({
    type: productTypes.SET_PAGE,
    page
})
export const setTotalPage = (totalpage) => ({
    type: productTypes.SET_TOTAL_PAGE,
    totalpage
})
export const brandSetPage = (page) => ({
    type: productTypes.BRAND_SET_PAGE,
    page
})
export const brandSetTotalPage = (totalpage) => ({
    type: productTypes.BRAND_SET_TOTAL_PAGE,
    totalpage
})
export const categorySetPage = (page) => ({
    type: productTypes.CATEGORY_SET_PAGE,
    page
})
export const categorySetTotalPage = (totalpage) => ({
    type: productTypes.CATEGORY_SET_TOTAL_PAGE,
    totalpage
})



export const getCategory = () => async (dispatch, getState) =>  {
    let res
    try {
        res = await axios.get('http://localhost:8080/category/all/' + getState().productReducers.category.page)
    }
    catch (err) {
        return
    }
    dispatch(setCategory(res.data.data))
    dispatch(categorySetTotalPage(res.data.totalPage))
}



export const getBrand = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/brand/all/' + getState().productReducers.brand.page)
    }
    catch(err) {
        return
    }
    dispatch(setBrand(res.data.data))
    dispatch(brandSetTotalPage(res.data.totalPage))
}

export const setCategory = (data) => ({
    type: productTypes.SET_CATEGORY_PRODUCT,
    data
})


export const setBrand = (data) => ({
    type: productTypes.SET_BRAND,
    data
})
export const addCategorySuccess = () =>({
    type: productTypes.ADD_CATEGORY_SUCCESS
})
export const addCategotyFail = () => ({
    type: productTypes.ADD_CATEGORY_FAIL
})
export const updateCategorySuccess = () => ({
    type: productTypes.UPDATE_CATEGORY_SUCCESS
})
export const updateCategoryFail = () => ({
    type: productTypes.UPDATE_CATEGORY_FAIL
})
export const resetCategory = () => ({
    type: productTypes.RESET_CATEGORY
})
export const addCategory =  (name, path) => async (dispatch, getState) => {
    dispatch(resetCategory())
    //let res
    try {
        //res = 
        await axios.post('http://localhost:8080/admin/addcategory', {
            name: name,
            path: path
        })
    }
    catch(err) {
        dispatch(addCategotyFail())
        return
    } 
    dispatch(addCategorySuccess())
    dispatch(getCategory())
}

export const updateCategory =  (id, name) => async (dispatch, getState) => {
    //let res
    try {
        //res = 
        await axios.post('http://localhost:8080/admin/updatecategory', {
            id: id,
            name: name
        })
    }
    catch(err) {
        dispatch(updateCategoryFail())
        return
    } 
    dispatch(updateCategorySuccess())
    dispatch(getCategory())
}
export const addBrandSuccess = () =>({
    type: productTypes.ADD_BRAND_SUCCESS
})
export const addBrandFail = () => ({
    type: productTypes.ADD_BRAND_FAIL
})
export const updateBrandSuccess = () => ({
    type: productTypes.UPDATE_BRAND_SUCCESS
})
export const updateBrandFail = () => ({
    type: productTypes.UPDATE_BRAND_FAIL
})
export const resetBrand = () => ({
    type: productTypes.RESET_BRAND
})
export const addBrand =  (name) => async (dispatch, getState) => {
    dispatch(resetBrand())
    //let res
    try {
        //res = 
        await axios.post('http://localhost:8080/admin/addbrand', {
            name: name
        })
    }
    catch(err) {
        dispatch(addBrandFail())
        return
    } 
    dispatch(addBrandSuccess())
    dispatch(getBrand())
}

export const updateBrand =  (id, name) => async (dispatch, getState) => {
    //let res
    try {
        //res = 
        await axios.post('http://localhost:8080/admin/updatebrand', {
            id: id,
            name: name
        })
    }
    catch(err) {
        dispatch(updateBrandFail())
        return
    } 
    dispatch(updateBrandSuccess())
    dispatch(getBrand())
}
export const backPage = () => (dispatch, getState) => {
    let page = getState().productReducers.product.page
    if(page > 1) {
        dispatch(setPage(parseInt(page) - 1))
    }
}

export const nextPage = () => (dispatch, getState) => {
    let page = getState().productReducers.brand.page
    let totalpage = getState().productReducers.brand.totalpage
    if(page < totalpage) {
        dispatch(setPage(parseInt(page) + 1))
    }
}
export const brandBackPage = () => (dispatch, getState) => {
    let page = getState().productReducers.product.page
    if(page > 1) {
        dispatch(brandSetPage(parseInt(page) - 1))
    }
}

export const brandNextPage = () => (dispatch, getState) => {
    let page = getState().productReducers.brand.page
    let totalpage = getState().productReducers.brand.totalpage
    if(page < totalpage) {
        dispatch(brandSetPage(parseInt(page) + 1))
    }
}
export const categoryBackPage = () => (dispatch, getState) => {
    let page = getState().productReducers.category.page
    if(page > 1) {
        dispatch(categorySetPage(parseInt(page) - 1))
    }
}

export const categoryNextPage = () => (dispatch, getState) => {
    let page = getState().productReducers.category.page
    let totalpage = getState().productReducers.category.totalpage
    if(page < totalpage) {
        dispatch(categorySetPage(parseInt(page) + 1))
    }
}

export const orderBackPage = () => (dispatch, getState) => {
    let page = getState().productReducers.order.page
    if(page > 1) {
        dispatch(orderSetPage(parseInt(page) - 1))
    }
}

export const orderNextPage = () => (dispatch, getState) => {
    let page = getState().productReducers.order.page
    let totalpage = getState().productReducers.order.totalpage
    if(page < totalpage) {
        dispatch(orderSetPage(parseInt(page) + 1))
    }
}
export const addProductSuccess = () => ({
    type: productTypes.ADD_PRODUCT_SUCCESS
})
export const addProductFail = () => ({
    type: productTypes.ADD_PRODUCT_FAIL
})
export const updateProductSuccess = () => ({
    type: productTypes.UPDATE_PRODUCT_SUCCESS
})
export const updateProductFail = () => ({
    type: productTypes.UPDATE_PRODUCT_FAIL
})

export const setOrder = (data) => ({
    type: productTypes.ORDER_SET_DATA,
    data
})
export const orderSetPage = (page) => ({
    type: productTypes.ORDER_SET_PAGE,
    page
})
export const orderSetTotalPage = (totalpage) => ({
    type: productTypes.ORDER_SET_TOTAL_PAGE,
    totalpage
})
export const getOrder = (status) => async(dispatch, getState) => {
    let link = "http://localhost:8080/order/status/true"
    if(status === "false") {
        link = "http://localhost:8080/order/status/false"
    }
    let res = null
    try {
       res =  await axios.get(link)
    }
    catch(err) {
        return
    }
    dispatch(setOrder(res.data.data))
    dispatch(orderSetTotalPage(res.data.totalPage))

}