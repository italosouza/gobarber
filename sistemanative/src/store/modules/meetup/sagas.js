import { all, takeLatest, call, put } from 'redux-saga/effects'
import { Alert } from 'react-native'
import api from '~/services/api'
import { meetupFailure, meetupEditSuccess } from './actions'

export function* meetupEdit({ payload }) {
  try {
    const { id, title, description, date, location } = payload.data
    const meetup = {
      title,
      description,
      date,
      location,
    }

    const response = yield call(id ? api.post : api.put, '/meetup', meetup)

    yield put(meetupEditSuccess(response.data))
    Alert.alert('Sucesso', 'Meetup alterado com sucesso.')
  } catch (err) {
    Alert.error(
      'Falha no cadastro',
      'Não foi possível carregar dados do Meetup!'
    )
    yield put(meetupFailure())
  }
}

export default all([takeLatest('@meetup/MEETUP_EDIT_REQUEST', meetupEdit)])
