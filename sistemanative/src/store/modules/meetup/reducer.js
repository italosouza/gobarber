import produce from 'immer'

const INITIAL_STATE = {
  meetup: null,
  loading: false,
}

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/MEETUP_EDIT_REQUEST': {
        draft.meetup = action.payload.data
        draft.loading = true
        break
      }

      case '@meetup/MEETUP_EDIT_SUCCESS': {
        draft.loading = false
        break
      }

      case '@meetup/MEETUP_FAILURE': {
        draft.meetup = null
        draft.loading = false
        break
      }

      default:
    }
  })
}
