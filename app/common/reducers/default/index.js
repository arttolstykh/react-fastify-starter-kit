import * as actions from '../../constants'

export function defaultReducer (
  state = {
    user: 'default user'
  },
  action
) {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: action.payload.user
      }
    default:
      return state
  }
}
