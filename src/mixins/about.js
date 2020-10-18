const about = {
  data () {
    return {
      Judul: 'FoodItems',
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
