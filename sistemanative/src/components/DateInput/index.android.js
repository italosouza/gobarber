import React, { useMemo } from 'react'

import PropTypes from 'prop-types'
import { DatePickerAndroid } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, DateButton, DateText } from './styles'
import { formatDate } from '~/util/format'

export default function DateInput({ date, onChange }) {
  const dateFormatted = useMemo(
    () => formatDate(date, "d 'de' MMMM 'de' yyyy"),
    [date]
  )

  async function handleOpenPicker() {
    console.tron.log('clicou pra abrir')
    const { action, year, month, day } = await DatePickerAndroid.open({
      mode: 'spinner',
      date,
      minDate: new Date(),
    })

    if (action === DatePickerAndroid.dateSetAction) {
      const selectedDate = new Date(year, month, day)
      onChange(selectedDate)
    }
  }

  return (
    <Container>
      <DateButton onPress={handleOpenPicker}>
        <Icon name='event' color='#fff' size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>
    </Container>
  )
}

DateInput.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
}
