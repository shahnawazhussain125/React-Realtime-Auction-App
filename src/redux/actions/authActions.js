import firebase from '../../config/firebase';

export const signUp = (signup_data) =>{
    return(dispatch) =>{
        firebase.auth().createUserWithEmailAndPassword(signup_data.email, signup_data.password)
        .then((response)=>{
            firebase.firestore().collection("users").doc(response.user.uid).set({
                email: signup_data.email,
                name: signup_data.name,
                uid: response.user.uid
            })
            .then(() =>{
                dispatch({type: "SIGN_UP_SUCCESS", user: response.user, name: signup_data.name})
            })
            .catch(error =>{
                dispatch({type: "SIGN_UP_ERROR", error})
            })
        })
        .catch(error =>{
            dispatch({type: "SIGN_UP_ERROR", error})
        })
    }
}


export const signIn = (sigin_data) =>{
    return(dispatch) =>{
        firebase.auth().signInWithEmailAndPassword(sigin_data.email, sigin_data.password)
        .then((response) =>{
            firebase.firestore().collection('users').doc(response.user.uid).get()
            .then((resp) =>{
                dispatch({type: "SIGN_IN_SUCCESS", user: response.user, name: resp.data().name});
            })
            .catch((error) =>{
                dispatch({type: "SIGN_IN_ERROR", error });
            })
        })
        .catch((error) =>{
            dispatch({type: "SIGN_IN_ERROR", error });
        })
    }
}

export const signOut = () =>{
    return(dispatch)=>{
        firebase.auth().signOut()
        .then(()=>{
            dispatch({type: "SIGN_OUT_SUCCESS", });
        })
        .catch(error=>{
            dispatch({type: "SIGN_OUT_ERROR"})
        })
    }
}