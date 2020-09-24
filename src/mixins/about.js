const about = {
  data () {
    return {
      Judul: 'POSFoodCourt | Copyright@Alfahan'
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
