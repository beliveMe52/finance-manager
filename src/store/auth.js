import firebase from "firebase/app";


export default {
   actions: {
      async login({dispatch, commit}, {email,password}) {
         try {
            await firebase.auth().signInWithEmailAndPassword(email,password)
         } catch (e) {
            commit('setError',e)
            throw e
         }
      },
      async register({dispatch, commit}, {email, password, name}){
         try {
            await firebase.auth().createUserWithEmailAndPassword(email,password)
            const uid = await dispatch('getUid')
            console.log(uid)
            await firebase.database().ref(`/users/${uid}/info`).set({
               name: name,
               account: 1000,
            })
         } catch (e) {
            commit('setError',e)
            throw e
         }
      },
      getUid() {
         const user = firebase.auth().currentUser
         return user ? user.uid : null
      },
      async logout({commit}) {
         await firebase.auth().signOut()
         commit('clearInfo') 
      },
      
   }
}