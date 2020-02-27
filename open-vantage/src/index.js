import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch} from 'react-router-dom';
import ClientPage from './screens/client/ClientPage'
import AdminPage from './screens/admin/AdminPage'
import LandingPage from './screens/LandingPage'
import productDetail from './screens/client/productDetail'



import ApolloClient from 'apollo-boost';

import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.css';

import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
    uri: "https://eu1.prisma.sh/frikan-erwee/ov-assesment-shop-prisma/dev"
  });



const history = createBrowserHistory();
const store = createStore(rootReducer, applyMiddleware(thunk));


class OpenVantageWeb extends React.Component {



    render() {
        return (
            <ApolloProvider client={client}>
            <Provider store={store}>
                <Router history={history}>
                    <div>
                        <div>
                            <Switch>
                                <Route exact path={"/"} component={LandingPage} />
                                <Route exact path={"/LandingPage"} component={LandingPage} />
                                <Route exact path={"/ClientPage"} component={ClientPage} />
                                <Route exact path={"/AdminPage"} component={AdminPage} />
                                <Route exact path={"/productDetail"} component={productDetail} />
                                
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
          </ApolloProvider>

         );
    }
}


ReactDOM.render(<OpenVantageWeb />, document.getElementById('root'));









// import React, { Component, PropTypes } from 'react';
// import { Router } from 'react-router';
// import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';
// import { ApolloProvider } from 'react-apollo'

// const client = new ApolloClient({  networkInterface: createNetworkInterface('http://localhost:8080/graphql'),  queryTransformer: addTypename,})

// class AppContainer extends Component {
    
    
// static propTypes = {history: PropTypes.object.isRequired, routes: PropTypes.object.isRequired, store: PropTypes.object.isRequired  }


// render () {   
    
//     const { history, routes } = this.props

// return (  
    
//     <ApolloProvider client={client}>
//                 <div> 
//                     <Router history={history} children={routes} />       
//                 </div>      
                
//     </ApolloProvider>   
//      )  }}


// export default AppContainer