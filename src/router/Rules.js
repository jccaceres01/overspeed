export const auth = (from, to, next) => {
  if (localStorage.getItem('hash') !== null) {
    next()
  } else {
    next('/login')
  }
}
