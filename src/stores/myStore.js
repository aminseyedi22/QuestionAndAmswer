import { defineStore } from 'pinia'

export const useStore = defineStore('myStore', {
  state: () => ({
    ques: [],
    Loading: true,
    counter: 0,
  }),
  actions: {
    async getData() {
      this.Loading = true
      const res = await fetch('http://localhost:3000/result')
      const data = await res.json()
      this.ques = data
      this.Loading = false
    }
  },
  /*   getters: {
      getQuestions(state) {
        return state.ques
      }
    }, */
}
)
