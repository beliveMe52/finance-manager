import firebase from "firebase/app";

export default {
   actions: {
      async fetchCategory({commit, dispatch}) {
         try {
            const uId = await dispatch('getUid')
            const database = firebase.database()
            const categories = (await database.ref(`/users/${uId}/categories`).once('value')).val();
            return Object.keys(categories).map(key => ({...categories[key], id: key }))
         } catch (error) { 
            commit('setError', error)
            throw error
         }
      },
      async fetchCategoryById({commit, dispatch}, id) {
         try {
            const uId = await dispatch('getUid')
            const database = firebase.database()
            const category = (await database.ref(`/users/${uId}/categories`).child(id).once('value')).val();
            return { ...category, id}
         } catch (error) { 
            commit('setError', error)
            throw error
         }
      },
      async updateCategories({commit, dispatch}, {id, title, limit}) {
         try {
            const uId = await dispatch('getUid')
            const database = firebase.database()
            await database.ref(`/users/${uId}/categories/`).child(id).update({title, limit})
         } catch (error) {
            commit('setError', error)
            throw error 
         }
      },
      async CreateCategorie({commit, dispatch}, {title, limit}) {
         try {
            const uId = await dispatch('getUid')
            const database = firebase.database()
            const category = await database.ref(`/users/${uId}/categories/`).push({title, limit})
            return {title, limit, id: category.key}
         } catch (error) {
            commit('setError', error)
            throw error
         }
      }
   }
}