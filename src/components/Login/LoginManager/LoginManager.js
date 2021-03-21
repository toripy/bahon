import React from 'react';
import firebase from 'firebase/app'
import "firebase/auth";
import firebaseConfig from '../firebase.config';

export const initializeLoginFramework = () => {
    if ( !firebase.apps.length ) {
        firebase.initializeApp( firebaseConfig );
    } else {
        firebase.app();
    }
}
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup( googleProvider )
        .then( res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;

        } )
        .catch( err => {
            console.log( err );
        } )
}


export const createUserWithEmailAndPassword = ( name, email, password ) => {
    return firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( res => {

            const createdUser = res.user;
            createdUser.isUser = true;
            createdUser.error = '';
            createdUser.success = true;

            updateUserName( name )
            return createdUser

        } )
        .catch( err => {
            const createdUser = {};
            createdUser.isUser = false;

            const code = err.code;
            if ( code.indexOf( "password" ) !== -1 ) {
                createdUser.passwordError = err.message;
            }
            else if ( code.indexOf( "email" ) !== -1 ) {
                createdUser.emailError = err.message;
            }


            createdUser.success = false;
            return createdUser;
        } )

}
export const signInWithEmailAndPassword = ( email, password ) => {
    return firebase.auth().signInWithEmailAndPassword( email, password )
        .then( res => {

            const createdUser = res.user;
            createdUser.isSignedIn = true;
            createdUser.error = '';
            createdUser.success = true;
            return createdUser;
        } )
        .catch( err => {
            console.log( err );
            const createdUser = {};
            createdUser.isSignedIn = false;
            const code = err.code;
            if ( code.indexOf( "password" ) !== -1 ) {
                createdUser.passwordError = err.message;
            }
            else if ( code.indexOf( "email" ) !== -1 ) {
                createdUser.emailError = err.message;
            }


            createdUser.error = err.message;

            return createdUser;
        } )
}
const updateUserName = ( name ) => {
    var user = firebase.auth().currentUser;

    user.updateProfile( {
        displayName: name

    } ).then( function () {

    } ).catch( function ( error ) {
        console.log( error );
    } );

}