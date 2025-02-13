import React, {Component}from 'react';
import firebase from 'firebase'
import {connect} from 'react-redux';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import GoogleSuggest from '../Components/CreateEvent';
import {updateIsSignedIn} from '../ducks/userReducer';
import MyEvents from '../Components/Myevents';

firebase.initializeApp({ 
    apiKey:"AIzaSyAptYBKyKOnx7vUpYLMJNP_LbPrU6yohGs",
    authDomain:"event-finder-68c32.firebaseapp.com"
})

class Authorization extends Component {

    uiConfig = {
        signInFlow: "redirect",
        signInOptions: [
        //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccess: () => false
        }
      }

      componentDidMount =() =>{

          firebase.auth().onAuthStateChanged(user => {
              this.props.updateIsSignedIn(!!user)
          }) 
          // this.props.updateUserID(firebase.auth().currentUser.uid)
      }

    render() {
  return (
    <div className="App">
           {this.props.isSignedIn ? (
          <span>

            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>

            <div>
            
                <GoogleSuggest />
                <h1>My Events</h1>
                <MyEvents />
            </div>
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
    </div>
  );
}
}

const mapStateToProps = reduxState => {
  return {
    isSignedIn: reduxState.user.isSignedIn
  }
}

export default connect(mapStateToProps,
  {
    updateIsSignedIn
  }
)(Authorization);