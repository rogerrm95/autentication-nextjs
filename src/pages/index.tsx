import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Button, Container, LoginBox } from '../styles/login'

export default function Home() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {signIn} = useAuth()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data = {
      username,
      password
    }

    await signIn(data)
  }

  return (
    <Container>
      <LoginBox>

        <img src="cobasi.svg" alt="Pet Mania" />

        <h1>Login</h1>

        <form action="submit" onSubmit={(event) => handleSubmit(event)}>
          <label htmlFor='login'>Username
            <input
              type="text"
              name="login"
              id="login"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required />
          </label>

          <label htmlFor="password">Password
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required />
          </label>

          <Button type='submit'>
            Entrar
          </Button>
        </form>

      </LoginBox>
    </Container>
  )
}
