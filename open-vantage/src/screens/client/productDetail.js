
import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as OVActions from '../../redux/actions/openVintageActions';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { faTruck, faShoppingBasket, faMoneyCheck, fafacebook} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";

const CREATE_ORDER = gql`
mutation {
    createOrder(data: $data) {
        id
        createdAt
        deliveryNote
        products
        status
        orderer
    }
  }
`;
class productDetail extends Component {


    render() {

        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


        // let createOrderPack = {
        //     id: 1,
        //     createdAt: today,
        //     deliveryNote: 'hhhhhhhhhh',
        //     products: this.props.this.props.cartItems,
        //     status: 
        //     orderer
    
        // }
        return (    
        

<div>
        <nav class="navbar navbar-expand-lg py-3 navbar-dark bg-dark shadow-sm">
        <div class="container">
            <a href="#" class="navbar-brand">
            
            <img src="https://res.cloudinary.com/mhmd/image/upload/v1557368579/logo_iqjuay.png" width="45" alt="" class="d-inline-block align-middle mr-2"/>
            
            <span class="text-uppercase font-weight-bold">OPEN VANTAGE</span>
            </a>
            <a href="#" class="navbar-brand">
            

            <span  >
            <Link style={{ color:'white', marginLeft:20}} to="/LandingPage"> Back</Link>
            </span>
        </a>

            <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>

            <div id="navbarSupportedContent" class="collapse navbar-collapse row">
            <ul class="navbar-nav ml-auto">

                {/* this.props.history.push('/app/wealth'); */}

                <li >
                <Link to="/productDetail"> <FontAwesomeIcon className="icon-image" style={{ height:40, width:40,padding:10, color:'white'}} icon={faShoppingBasket} /></Link>
            
            </li>

            <li style={{ color:'white', marginTop:8}}>  {this.props.cartItems.length} items</li>
            </ul>


            </div>
        </div>
        </nav>

        <h2 style={{ marginTop:20, marginBottom: 20}} className="d-flex justify-content-center">
                Basket items
            </h2>
        <div className="d-flex justify-content-center" >
            <Table  style={{ width:'80%'}} striped bordered hover>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>


                        {
                            this.props.cartItems.map( data => {
                                return(
                                    <tr>
                                    <td>{data.id}</td>
                                    <td >{data.name}</td>
                                    <td>{data.description}</td>
                                </tr>

                                )
                            })
                        }

                        </tbody>
            </Table>
        </div>

        <Mutation mutation={CREATE_ORDER}>
            {(addTodo, { data }) => (

            <div>
                <form
                onSubmit={e => {
                    e.preventDefault();
                    addTodo( { data: { data: this.props.cartItems } });
                }}
                >
                
                <div className="d-flex justify-content-center">
                    <button type="submit" style={{  height:50, width:200, borderRadius:10  }}>ORDER</button>

                    </div>
                </form>
            </div>
            )}
        </Mutation>
</div>

        );
    }
}




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

export default connect(mapStateToProps, mapDispatchToProps)(productDetail);



