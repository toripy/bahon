import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import "firebase/auth";
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager/LoginManager.js';
import './Login.css'
function Login() {
    const [user, setUser] = useState( {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        password: ''
    } )
    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext( UserContext );
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const is_valid_email = email => /(.+)@(.+){2,}\.(.+){2,}/.test( email );
    const hasNumber = input => /\d/.test( input );
    const handleChange = e => {

        const newUserInfo = {
            ...user
        };

        let isValid = true;
        if ( e.target.name === 'email' ) {
            isValid = is_valid_email( e.target.value );
        }
        if ( e.target.name === "password" ) {
            isValid = e.target.value.length > 8 && hasNumber( e.target.value );
        }

        newUserInfo[e.target.name] = e.target.value;
        newUserInfo.isValid = isValid;
        setUser( newUserInfo );
    }

    const createAccount = ( event ) => {

        if ( user.isValid ) {
            createUserWithEmailAndPassword( user.name, user.email, user.password )
                .then( res => {
                    handleResponse( res, false )
                } )
                .catch( ( err ) => {
                    console.log( err );
                } )
        }
        event.preventDefault();

    }

    const signInUser = event => {

        if ( user.isValid ) {
            signInWithEmailAndPassword( user.email, user.password )
                .then( res => {
                    handleResponse( res, true )

                } )
                .catch( ( err ) => {
                    console.log( err );
                } )

        }
        event.preventDefault();
        event.target.reset();
    }
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then( res => {
                handleResponse( res, true )
            } )
    }
    const handleResponse = ( res, redirect ) => {
        setUser( res )
        setLoggedInUser( res )
        redirect && history.replace( from );
    }
    const [hasAccount, setHasAccount] = useState( true );


    const [passwordError1, setPasswordError1] = useState( "" )
    const errorFinder = () => {

        if ( ( user.passwordError === '' ) && ( user.password !== user.password1 ) ) {
            setPasswordError1( "Confirmed incorrect password" )

        }
    }
    const [handleSwitch, setHandleSwitch] = useState( false )
    const click = () => {
        if ( user.password === user.password1 && user.name !== '' && user.email !== "" ) {
            setHandleSwitch( true )
        }
    }

    return (
        <section className="login">
            <div className="loginContainer">

                <form style={{ display: ( !hasAccount || handleSwitch ) ? 'block' : 'none' }} onSubmit={signInUser} >
                    <h3>Login</h3>
                    <input type="email" onBlur={handleChange} name="email" placeholder="user or email" required />
                    <p className="errorMsg"></p>
                    <input type="password" onBlur={handleChange} required name="password" placeholder="Password" />
                    <p className="errorMsg"></p>
                    <input className="btnContainer" type="submit" value="Login" />
                    <p className="display">Don't have an account ? <span onClick={() => setHasAccount( !hasAccount )}>Sign up</span></p>
                    <p className="errorMsg">{user.message}</p>

                </form>
                <form style={{ display: !hasAccount || handleSwitch ? 'none' : 'block' }} onSubmit={createAccount}>
                    <h3>Create an Account</h3>
                    <input type="text" onBlur={handleChange} name="name" required id="" placeholder="name" />
                    <p className="errorMsg"></p>
                    <input type="email" onBlur={handleChange} name="email" placeholder="user or email" required />
                    <p className="errorMsg">{user.emailError}</p>
                    <input type="password" onBlur={handleChange} required name="password" placeholder="Password" />
                    <p className="errorMsg">{user.passwordError}</p>
                    <input type="password" onBlur={handleChange} required name="password1" placeholder="Confirm Password" />
                    <p className="errorMsg">{passwordError1}</p>
                    <input className="btnContainer" onClick={() => [errorFinder(), click()]} type="submit" value="Sign up" />
                    <p className="display">Have an account ? <span onClick={() => setHasAccount( !hasAccount )}>Sign in</span></p>
                    <br />
                    <p style={{ textAlign: "center", color: "white" }}>________________Or________________</p>
                </form>

                <button onClick={googleSignIn} > Sign in by google</button>

            </div>

        </section>
    );
}

export default Login;