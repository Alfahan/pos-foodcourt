const about = {
  data () {
    return {
      Judul: 'FoodItems',
      JudulHistory: 'History',
      Login: 'Login',
      Footer: 'POS FoodCourt | Copyright@Alfahan'
    }
  },
  directives: {
    kolor: {
      bind: (element, binding) => {
        element.style.color = binding.value
      }
    }
  }
}

export default about
