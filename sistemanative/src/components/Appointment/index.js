import React, { useMemo } from 'react'

import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Container, Left, Avatar, Info, Name, Time } from './styles'
import { formatDateRelative } from '~/util/format'

export default function Appointment({ data, onCancel }) {
  const { name, avatar } = data.provider

  const dateFormatted = useMemo(() => {
    return formatDateRelative(data.date)
  }, [data.date])

  const avatarUrl = avatar
    ? avatar.url
    : `https://api.adorable.io/avatar/50/${name}.png`

  return (
    <Container past={data.past}>
      <Left>
        <Avatar source={{ uri: avatarUrl }} />

        <Info>
          <Name>{name}</Name>
          <Time>{dateFormatted}</Time>
        </Info>
      </Left>

      {!data.past && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name='event-busy' size={20} color='#f64c75' />
        </TouchableOpacity>
      )}
    </Container>
  )
}

Appointment.propTypes = {
  data: PropTypes.shape({
    provider: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    date: PropTypes.string,
    past: PropTypes.bool,
    canceled_at: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
}
