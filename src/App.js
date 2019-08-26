import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';

class App extends React.Component{
  //property/function to handle auth
  unsubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props;

    //this will listen for auth state changes
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //if the userAuth isnt null, set the userstate
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        });
      }else{
        //if its null just set the current user to null, useful when you logout
        setCurrentUser(userAuth);
      }


    });
  }

  componentWillUnmount() {
    //this will close the subscription whenever the app unmounts
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signIn' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
