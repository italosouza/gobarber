export function meetupEditRequest(data) {
  return {
    type: '@meetup/MEETUP_EDIT_REQUEST',
    payload: { data },
  }
}

export function meetupEditSuccess() {
  return {
    type: '@meetup/MEETUP_EDIT_SUCCESS',
  }
}

export function meetupFailure() {
  return {
    type: '@meetup/MEETUP_FAILURE',
  }
}
