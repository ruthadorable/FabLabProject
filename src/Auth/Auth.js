import auth0 from 'auth0-js';
import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";


const REDIRECT_ON_LOGIN = "redirect_on_login";

// Stored outside class since private
// eslint-disable-next-line
let _idToken = null;
let _accessToken = null;
let _scopes = null;
let _expiresAt = null;

function Content(){
    let history = useHistory();
}

export default class Auth extends React.Component{

constructor(history){
    super();
    this.history=history;
    this.userProfile = null;
    this.requestedScopes = "openid profile email read:courses";
    this.auth0=new auth0.WebAuth({
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
        redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
        responseType: "token id_token",
        scope: "openid profile email",

    });

}

roleAuth= (user, context)=> {
    const namespace = 'http://schemas.microsoft.com/ws/2008/06/identity/claims';
    const assignedRoles = (context.authorization || {}).roles;
  
    let idTokenClaims = context.idToken || {};
    let accessTokenClaims = context.accessToken || {};
  
    idTokenClaims[`${namespace}/role`] = assignedRoles;
    accessTokenClaims[`${namespace}/role`] = assignedRoles;
  
    context.idToken = idTokenClaims;
    context.accessToken = accessTokenClaims;
  
    
  }
login =()=>{
    this.auth0.authorize();
}
handleAuthentication = () =>{
    <Content/>;
    this.auth0.parseHash((err,authResult)=>{
        if (authResult  && authResult.accessToken && authResult.idToken)
        {
                this.setSession(authResult);
                this.roleAuth(this.userProfile,authResult);
                this.history.push("/");
        }
        else if(err){
            
           /* alert(`Error: ${err.error}. Check the console for further details`);
            console.log(err);
            this.history.push("/");*/
        }
    })
}
setSession= authResult=>{
    //set the time that the access token will expire
    const expiresAt=JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token",authResult.accessToken);
    localStorage.setItem("id_token",authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
};
isAuthenticated=()=>{
    const expiresAt=JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt ;
}
isAdmin=()=>{

    return 
}
logout= ()=>{
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.auth0.logout({
        clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
        returnTo: "http://localhost:3000"
    })
}
getAccessToken = () => {
    const accessToken =localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found.");
    }
    return accessToken;
  };

  getProfile = (cb) => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, err);
    });
  };
/*
  userHasScopes(scopes) {
    const grantedScopes = (_scopes || "").split(" ");
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  renewToken(cb) {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(`Error: ${err.error} - ${err.error_description}.`);
      } else {
        this.setSession(result);
      }
      if (cb) cb(err, result);
    });
  }

  scheduleTokenRenewal() {
    const delay = _expiresAt - Date.now();
    if (delay > 0) setTimeout(() => this.renewToken(), delay);
  }*/
}