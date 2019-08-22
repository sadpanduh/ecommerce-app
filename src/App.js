import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  //property/function to handle auth
  unsubscribeFromAuth = null

  componentDidMount(){
    //this will listen for auth state changes
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //if the userAuth isnt null, set the userstate
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        });
      }else{
        //if its null just set the current user to null, useful when you logout
        this.setState({currentUser: userAuth});
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signIn' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
