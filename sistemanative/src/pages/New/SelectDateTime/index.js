import React, { useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Background from '~/components/Background'
// eslint-disable-next-line import/no-unresolved
import DateInput from '~/components/DateInput'

import { Container, HourList, Hour, Title } from './styles'
import api from '~/services/api'

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date())
  const [hours, setHours] = useState([])

  const provider = navigation.getParam('provider')

  useEffect(() => {
    async function loadAvailable() {
      try {
        const response = await api.get(`/providers/${provider.id}/available`, {
          params: {
            date: date.getTime(),
          },
        })

        setHours(response.data)
      } catch (err) {
        console.tron.log(err)
      }
    }
    loadAvailable()
  }, [date, provider.id])

  function handleSelectValue(time) {
    navigation.navigate('Confirm', {
      provider,
      time,
    })
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

        <HourList
          data={hours}
          extraData={date}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => handleSelectValue(item.value)}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  )
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
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

SelectDateTime.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
}
