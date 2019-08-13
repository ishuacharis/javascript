import store from '../../../store'
const beforeUserEnter = (to, from, next) => {
  const token = store.state.session_token
  const requiresAuth = to.matched.some(record => record.meta.requireAuth)

  if (requiresAuth) {
    if (!token || token === null) {
      next({
        path: '/login',
        params: {
          nextUrl: to.fullPath
        }
      })
    } else {
      next()
    }
  }
}

const beforeGuestEnter = (to, from, next) => {
  const token = store.state.session_token
  const guestAccess = to.matched.some(record => record.meta.guest)
  if (guestAccess) {
    if (!token) {
      next()
    } else {
      next({
        'name': 'Home'
      })
    }
  } else {
    next()
  }
}

const beforePunterEnter = (to, from, next) => {
  const token = store.state.session_token
  const punterAccess = to.matched.some(record => record.meta.punter)
  if (punterAccess) {
    if (!token) {
      next()
    } else {
      next({
        'name': 'Home'
      })
    }
  } else {
    next()
  }
}

const beforeAdminEnter = (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requireAuth)
  const token = store.state.session_token
  const adminAccess = to.matched.some(record => record.meta.is_admin)

  if (requiresAuth) {
    if (!token || token === null) {
      next({
        path: '/login',
        params: {
          nextUrl: to.fullPath
        }
      })
    } else {
      if (adminAccess) {
        // load the admin area or router
        next()
      } else {
        next()
      }
    }
  } else {
    next()
  }
}
export {
  beforeUserEnter,
  beforeGuestEnter,
  beforePunterEnter,
  beforeAdminEnter
}
