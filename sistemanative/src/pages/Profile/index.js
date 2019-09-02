import React, { useRef, useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Background from '~/components/Background'

import {
  Container,
  Title,
  Form,
  FormInput,
  SubmitButton,
  Separator,
  LogoutButton,
} from './styles'

import { updateProfileRequest } from '~/store/modules/user/actions'
import { signOutRequest } from '~/store/modules/auth/actions'

export default function Profile() {
  const profile = useSelector(state => state.user.profile)
  const dispatch = useDispatch()

  const emailRef = useRef()
  const passwordRef = useRef()
  const oldPasswordRef = useRef()
  const confirmPasswordRef = useRef()

  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const loading = useSelector(state => state.user.loading)

  useEffect(() => {
    setPassword('')
    setOldPassword('')
    setConfirmPassword('')
  }, [profile])

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        password,
        oldPassword,
        confirmPassword,
      })
    )
  }

  function handleLogout() {
    dispatch(signOutRequest())
  }

  return (
    <Background>
      <Container>
        <Title>Meu perfil</Title>
        <Form>
          <FormInput
            icon='person-outline'
            keyboardType='email-address'
            autoCorrect={false}
            placeholder='Nome completo'
            returnKeyType='next'
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon='mail-outline'
            keyboardType='email-address'
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Digite seu e-mail'
            ref={emailRef}
            returnKeyType='next'
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            icon='lock-outline'
            secureTextEntry
            placeholder='Sua senha atual'
            ref={oldPasswordRef}
            returnKeyType='next'
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <FormInput
            icon='lock-outline'
            secureTextEntry
            placeholder='Sua senha nova'
            ref={passwordRef}
            returnKeyType='next'
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />

          <FormInput
            icon='lock-outline'
            secureTextEntry
            placeholder='Confirme sua senha nova'
            ref={confirmPasswordRef}
            returnKeyType='send'
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <SubmitButton onPress={handleSubmit} loading={loading}>
            Atualizar perfil
          </SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair</LogoutButton>
        </Form>
      </Container>
    </Background>
  )
}

function barIcon({ tintColor }) {
  return <Icon name='person' size={20} color={tintColor} />
}

barIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: barIcon,
}
