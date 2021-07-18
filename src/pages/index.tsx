import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Button, Container, LoginBox } from '../styles/login'

export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {signIn} = useAuth()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data = {
      email,
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
