import React, { useState, useMemo } from 'react'

import PropTypes from 'prop-types'
import { DatePickerIOS } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, DateButton, DateText, Picker } from './styles'
import { formatDate } from '~/util/format'

export default function DateInput({ date, onChange }) {
  const [opened, setOpened] = useState(false)

  const dateFormatted = useMemo(() => formatDate(date), [date])

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name='event' color='#fff' size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <Picker>
          <DatePickerIOS
            date={date}
            onDateChange={onChange}
            minimumDate={new Date()}
            minuteInterval={60}
            locale='pt'
            mode='date'
          />
        </Picker>
      )}
    </Container>
  )
}

DateInput.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
}
