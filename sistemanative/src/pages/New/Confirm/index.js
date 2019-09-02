import React, { useMemo, useState } from 'react'

import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Background from '~/components/Background'
import { formatDateRelative } from '~/util/format'

import { Container, Avatar, Name, Time, SubmitButton } from './styles'
import api from '~/services/api'

export default function Confirm({ navigation }) {
  const provider = navigation.getParam('provider')
  const time = navigation.getParam('time')

  const dateFormatted = useMemo(() => formatDateRelative(time), [time])
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    try {
      setLoading(true)
      await api.post('/appointments', {
        provider_id: provider.id,
        date: time,
      })

      navigation.navigate('Dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />

        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleSubmit} loading={loading}>
          Entrar
        </SubmitButton>
      </Container>
    </Background>
  )
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar agendamento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack()
      }}
    >
      <Icon name='chevron-left' size={20} color='#fff' />
    </TouchableOpacity>
  ),
})

Confirm.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
}
