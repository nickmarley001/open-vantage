import {OVintageApi} from '../../services/OVintageApi';
import axios from 'axios';

export const CREATE_PRODUCT_INITIATE = "CREATE_PRODUCT_INITIATE";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";
export const CREATE_PRODUCT_RESET = "CREATE_PRODUCT_RESET";


export const GET_PRODUCT_INITIATE = "GET_PRODUCT_INITIATE";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_FAILURE = "GET_PRODUCT_FAILURE";
export const GET_PRODUCT_RESET = "GET_PRODUCT_RESET";

export const MAKE_ORDER_INITIATE = "MAKE_ORDER_INITIATE";
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";
export const MAKE_ORDER_FAILURE = "MAKE_ORDER_FAILURE";
export const MAKE_ORDER_RESET = "MAKE_ORDER_RESET";


export const ADD_TO_CART = "ADD_TO_CART";




function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }


// POST-- CREATE PRODUCT
//--------------------------------------------

export const createProduct = (postData) => {
        console.log('ppp',postData)
        return dispatch => {
            dispatch(createProductInitiate());
    
         axios({
            method: 'post',
            url:'https://eu1.prisma.sh/frikan-erwee/ov-assesment-shop-prisma/dev',
            data: postData
          })
                .then(function (res) {
                if (isEmpty(res)) {
                    dispatch(createProductFailed(res));
                }
                else if(!isEmpty(res)) {
                    console.log('mad',res);
                    dispatch(createProductSuccess(res));
                }
            
            })

    }
};

const createProductInitiate = () => {
    return {
        type: CREATE_PRODUCT_INITIATE
    }
};

const createProductSuccess = (response) => {
    return {
        type: CREATE_PRODUCT_SUCCESS,
        response: response
    }
};

const createProductFailed = (error) => {
    return {
        type: CREATE_PRODUCT_FAILURE,
        error: error
    }
};



const createProductReset = () => {
    return {
        type: CREATE_PRODUCT_RESET
    }
};









//-- GET PRODUCT
//--------------------------------------------

export const getAllProducts = () => {
    
    return dispatch => {
        dispatch(getProductInitiate());
    fetch('https://eu1.prisma.sh/frikan-erwee/ov-assesment-shop-prisma/dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
          query {
              products {
                id
                name
                description
                imageUrl
                status
              }
            }
          `,
        }),
      })
      .then(response => {
        //console.log('naleli1',response.json())
        return response.json()
       
      })
      .then(responseAsJson => {
       // this.setState({ loading: false, data: responseAsJson.data })
       dispatch(getProductSuccess(responseAsJson.data ));
       console.log('naleli2',responseAsJson.data )
      })

}
};

const getProductInitiate = () => {
return {
    type: GET_PRODUCT_INITIATE
}
};

const getProductSuccess = (response) => {
return {
    type: GET_PRODUCT_SUCCESS,
    response: response
}
};

const getProductFailed = (error) => {
return {
    type: GET_PRODUCT_FAILURE,
    error: error
}
};



const getProductReset = () => {
return {
    type: GET_PRODUCT_RESET
}
};





//-- ADD TO CART
//--------------------------------------------

export const addToCart = (product) => {
    
    return {
        type: ADD_TO_CART,
        response: product
    }
};



// POST-- MAKE ORDERS
//--------------------------------------------

export const makeOrder = (order) => {
    console.log('ppp',order)
    return dispatch => {
        dispatch(createProductInitiate());



        fetch('https://eu1.prisma.sh/frikan-erwee/ov-assesment-shop-prisma/dev', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
              query {
                  products {
                    id
                    name
                    description
                    imageUrl
                    status
                  }
                }
              `,
            }),
          })
          .then(response => {
            //console.log('naleli1',response.json())
            return response.json()
           
          })
          .then(function (res) {
            if (isEmpty(res)) {
                dispatch(makeOrderFailed(res));
            }
            else if(!isEmpty(res)) {
                console.log('mad',res);
                dispatch(makeOrderSuccess(res));
            }
        
        })






}
};

const makeOrderInitiate = () => {
return {
    type: MAKE_ORDER_INITIATE
}
};

const makeOrderSuccess = (response) => {
return {
    type: MAKE_ORDER_SUCCESS,
    response: response
}
};

const makeOrderFailed = (error) => {
return {
    type:  MAKE_ORDER_FAILURE,
    error: error
}
};



const makeOrderReset = () => {
return {
    type:  MAKE_ORDER_RESET
}
};

