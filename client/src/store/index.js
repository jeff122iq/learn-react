export const initialState = {
  loggedIn: localStorage.getItem('complexappToken'),
  flashMessages: [],
  user: {
    token: localStorage.getItem('complexappToken'),
    username: localStorage.getItem('complexappUsername'),
    avatar: localStorage.getItem('complexappAvatar')
  }
}

export const reducer = ( draft, action ) => {
  switch (action.type) {
    case 'LOG_IN':
      draft.loggedIn = true
        draft.user = action.data
      return
    case 'LOG_OUT':
      draft.loggedIn = false
      return
    case 'FLASH_MESSAGE':
      draft.flashMessages.push(action.value)
  }
}