const initialState = {
    getDataError: null,
    addDataError: null,
    products: [],
    allBits: [],
    getBitsError: null,
    getMyProductError: null,
}

const userReducer = (state = initialState, action) =>{
    switch (action.type) {
        case "GETPRODUCTBYCATEGORY_SUCCESS":
            return({
                ...state,
                getDataError: null,
                products: action.products
            })
        case "GETPRODUCTBYCATEGORY_ERROR":
            return({
                ...state,
                getDataError: action.error,
                products: []
            })
        case "ADDPRODUCT_SUCCESS":
         return({
             ...state,
             addDataError: action.error,
             message: action.message,
         })
        case "ADDPRODUCT_ERROR":
         return({
             ...state,
             addDataError: action.error,
         })
         case "UPDATEPRODUCT_SUCCESS":
         return({
             ...state,
             addDataError: action.error,
             message: action.message,
         })
        case "UPDATEPRODUCT_ERROR":
         return({
             ...state,
             addDataError: action.error,
         })
        case "GETMYPRODUCT_SUCCESS":
         return({
             ...state,
             getMyProductError: null,
             products: action.products
         })
         case "GETMYPRODUCT_ERROR":
          return({
              ...state,
              getMyProductError: action.error,
              products: []
          })
        case "SUBMITBIT_SUCCESS":
          return({
              ...state,
              submitBitError: null,
          })
        case "SUBMITBIT_ERROR":
          return({
            ...state,
            submitBitError: action.error,
          })
        case "GETBIT_SUCCESS":
          return({
              ...state,
              getBitsError: null,
              allBits: action.allBits,
          })
        case "GETBIT_ERROR":
          return({
              ...state,
              getBitsError: action.error,
          })
        case "DELETEPRODUCT_SUCCESS":
          return({
              ...state,
              deleteProductError: null,
          })
        case "DELETEPRODUCT_ERROR":
          return({
              ...state,
              deleteProductError: action.error,
          })
        case "GETMYCART_SUCCESS":
          return({
              ...state,
              getMyCart: null,
              products: action.products,
          })
        case "GETMYCART_ERROR":
          return({
              ...state,
              getMyCart: null,
              products: [],
          })
        case "GETMYBIT_SUCCESS":
          return({
              ...state,
              getMyBit: null,
              products: action.products,
          })
        case "GETMYBIT_ERROR":
          return({
              ...state,
              getMyBit: null,
              products: [],
          })
        case "SOLDPRODUCT_SUCCESS":
          return({
            ...state,
            soldProductError: null,
          })
        case "SOLDPRODUCT_ERROR":
          return({
            ...state,
            soldProductError: action.error
          })
        case "GETALLPRODUCT_SUCCESS":
          return({
            ...state,
            getAllProductError: null,
            allProducts: action.allProducts,
          })
        case "GETALLPRODUCT_ERROR":
          return({
            ...state,
            getAllProductError: action.error,
            allProducts: []
          })
        default:
            return state
    }
}

export default userReducer;