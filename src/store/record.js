import firebase from "firebase/app";

export default {
   actions: {
      async createRecord({dispatch,commit}, record) {
         try {
            const database = firebase.database();
            const uId = await dispatch('getUid')
            await database.ref(`/users/${uId}/records/`).push(record)
         } catch (error) {
            commit('setError', error)
            throw error
         }
      },
      async updateCount({dispatch,commit,getters}, data) {
         try {
            const database = firebase.database();
            const uId = await dispatch('getUid')
            const updateData = {...getters.info, ...data}
            await database.ref(`/users/${uId}/info/`).update(updateData)
            commit('setInfo', updateData)
         } catch (error) {
            commit('setError', error)
            throw error 
         }
      },
      async fetchRecords({dispatch,commit}) {
         try {
            const uId = await dispatch('getUid')
            const database = firebase.database()
            const records = (await database.ref(`/users/${uId}/records`).once('value')).val();
            return Object.keys(records).map(key => ({...records[key], id: key }))
         } catch (error) {
            commit('setError', error)
            throw error
         }
      },
      async fetchRecordById({dispatch,commit}, id) {
         try {
            const uId = await dispatch('getUid')
            const database = firebase.database()
            const record = (await database.ref(`/users/${uId}/records`).child(id).once('value')).val();
            return {...record, id}
         } catch (error) {
            commit('setError', error)
            throw error
         }
      }
   }
}