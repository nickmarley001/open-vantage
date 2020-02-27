
import React, {Component} from 'react';

import * as OVActions from '../redux/actions/openVintageActions';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import gql from 'graphql-tag';
import { ApolloProvider } from "react-apollo";
import { useMutation } from '@apollo/react-hooks';
import 'bootstrap/dist/css/bootstrap.css';
import '../screens/LandingPage.css'
import { faTruck, faShoppingBasket, faMoneyCheck, fafacebook} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import { Mutation } from "react-apollo";
import { Query } from 'react-apollo'



const ADD_PRODUCT = gql`
mutation {
    createProduct(data: {
      id: 32
      name: "product test number2"
      description: "this is my test product number2"
      imageUrl: "http://tineye.com/images/widgets/mona.jpg"
      status: INACTIVE
      
    }) {
      id
      name
      description
      imageUrl
      status
    }
  }
`;




class LandingPage extends Component {

    constructor() {
        super()
        //this.colRef = firebase.firestore().collection('products');
        this.state = {
         fetching: false,
         docs: [],
         allProducts:[],
         loading:false,
         datares:''
         
        };
      }

      componentDidMount() {
   
        this.props.oVActions.getAllProducts()
      }

      componentDidUpdate() {

        if(this.props.getProductSuccess) {
            console.log('elngi', this.props.getProductPack)
        }

        if(this.props.addToCartSuccess && this.props.cartItems.length >=0) {
            console.log('elnginnnn', this.props.cartItems)
        }
        

      }
    
      fetchData = () => {
        this.setState({ loading: true }, () => {
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
              return response.json()

            })
            .then(responseAsJson => {
              this.setState({ loading: false, datares: responseAsJson.data })
            })
        })
      }
      addProduct = product => {
      
      this.props.oVActions.addToCart(this.props.getProductPack.products[product])
    //  console.log('nnnnn',this.props.getProductPack.products[product])

      
      }
    
    


    render() {
        return (
    
    <div>
        <nav class="navbar navbar-expand-lg py-3 navbar-dark bg-dark shadow-sm">
          <div class="container">
            <a href="#" class="navbar-brand">
              <img src="https://res.cloudinary.com/mhmd/image/upload/v1557368579/logo_iqjuay.png" width="45" alt="" class="d-inline-block align-middle mr-2"/>
              <span class="text-uppercase font-weight-bold">OPEN VANTAGE</span>
            </a>

            <a href="#" class="navbar-brand">
              <span ><a style={{ color: '#fff' }} href="#" class="nav-link">Switch to admin</a></span>
            </a>

            <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>

            <div id="navbarSupportedContent" class="collapse navbar-collapse row">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active"><a href="#" class="nav-link">Client Side <span class="sr-only">(current)</span></a></li>
                <li class="nav-item"><a href="#" class="nav-link">Order history</a></li>
                <li >
                <Link to="/productDetail"> <FontAwesomeIcon className="icon-image" style={{ height:40, width:40,padding:10, color:'white'}} icon={faShoppingBasket} /></Link>
                </li>
                <li style={{ color:'white', marginTop:8}}>  {this.props.cartItems.length} items</li>
              </ul>
            </div>
          </div>
        </nav>


        <Mutation mutation={ADD_PRODUCT}>
        {(addTodo, { data }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                addTodo();
              }}
            >
              <button style={{ marginTop: 30, marginBottom: 30, marginLeft: 40}} type="submit">ADD PRODUCTS DUMMY WITH HARDCODED INPUT AS INIT</button>
            </form>
          </div>
        )}
        </Mutation>
            

<div class=" product-card">

{
    this.props.getProductSuccess?
    this.props.getProductPack.products.map((product,index) => {

        return(
          
          <div class="container page-wrapper product-card">
                  
                  <div class="page-inner">
                    <div class="row">
                      <div class="el-wrapper">
                        <div class="box-up">
                          <img style={{ height:180, width:'100%' }} class="img" src= {product.imageUrl} alt=""/>
                          <div class="img-info">
                            <div class="info-inner">
                              <span class="p-company">{product.name}</span>
                            </div>
                          </div>
                        </div>
                  
                        <div onClick={() => this.addProduct(index)} class="box-down">
                          <div class="h-bg">
                            <div class="h-bg-inner"></div>
                          </div>
                          <a class="cart" href="#">
                            <span  class="add-to-cart">
                              <span   class="txt">Add in cart</span>
                              
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
          </div>



        )
    }):
    <div></div>
}
</div>
</div>
        );
    }
}




LandingPage.propTypes = {
    createProductInitiate: PropTypes.bool.isRequired,
    createProductSuccess: PropTypes.bool.isRequired,
    createProductFail: PropTypes.bool.isRequired,
  
  };

const mapStateToProps = (state) => {

    const {
        createProductInitiate,
        createProductSuccess,
        createProductFail,

        getProductInitiate,
        getProductSuccess,
        getProductFail,
        getProductPack,

        cartItems,
        addToCartSuccess

    } = state.openVintageReducers;

    return {

        createProductInitiate,
        createProductSuccess,
        createProductFail,

        getProductInitiate,
        getProductSuccess,
        getProductFail,
        getProductPack,

        cartItems,
        addToCartSuccess
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        oVActions: bindActionCreators(OVActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);











// import React from 'react';
// import { connect } from 'react-apollo';
//  // NOTE: different connect!import gql from 'graphql-tag' // NOTE: lets us define GraphQL queries in a template language

//  export class LandingPage extends React.Component {  
//      constructor(props) { 
//             super(props)
//           }


//     render () {
//         return (
//             <div className='home'>
//                 <h1>Hello World</h1>
//             </div>   
//         )  
//     }
// }

// const mapQueriesToProps = ({ ownProps, state }) => {
//       return {   
//            data: { query: gql`  query { author(firstName:"Edmond", lastName: "Jones"){firstName posts { title   }  } } `  
//           }  }}


// export default connect({  mapQueriesToProps})(LandingPage)
        
    

        