import {

CREATE_PRODUCT_INITIATE,
CREATE_PRODUCT_SUCCESS,
CREATE_PRODUCT_FAILURE,
CREATE_PRODUCT_RESET,

GET_PRODUCT_INITIATE,
GET_PRODUCT_SUCCESS,
GET_PRODUCT_FAILURE,
GET_PRODUCT_RESET,

ADD_TO_CART
        
 } from '../actions/openVintageActions';
    
    const initialState = {
        createProductInitiate:false,
        createProductSuccess:false,
        createProductFail:false,
        createProductPack: {}, 
        getProductInitiate:false,
        getProductSuccess:false,
        getProductFail:false,
        getProductPack: {}, 

        cartItems:[],
        addToCartSuccess:false
    };
    
    
    export default (state = initialState, action) => {
      switch(action.type){
    
        case CREATE_PRODUCT_INITIATE:
           
            return Object.assign({}, state, {
                createProductInitiate:true,
                createProductSuccess:false,
                createProductFail:false,
            });
    
        case CREATE_PRODUCT_SUCCESS:

            return Object.assign({}, state, {

                createProductInitiate:false,
                createProductSuccess:true,
                createProductFail:false,
                createProductPack: action.payload, 
            });
    
        case CREATE_PRODUCT_FAILURE:

            return Object.assign({}, state, {
                createProductInitiate:false,
                createProductSuccess:false,
                createProductFail:true,
                
            });



            case GET_PRODUCT_INITIATE:
           
                return Object.assign({}, state, {
                    getProductInitiate:true,
                    getProductSuccess:false,
                    getProductFail:false,
                });
        
            case GET_PRODUCT_SUCCESS:
    
                return Object.assign({}, state, {
    
                    getroductInitiate:false,
                    getProductSuccess:true,
                    getProductFail:false,
                    getProductPack: action.response, 
                });
        
            case GET_PRODUCT_FAILURE:
    
                return Object.assign({}, state, {
                    getProductInitiate:false,
                    getProductSuccess:false,
                    getProductFail:true,
                    
                });

                case ADD_TO_CART:

                    return {

                        ...state,
                        cartItems:[...state.cartItems, action.response],
                        addToCartSuccess:true,
                    };

          default:
              return state;
      }
    };
    

    