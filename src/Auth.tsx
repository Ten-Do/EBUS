import { useState, useEffect, ReactNode } from 'react'
import { Centrifuge } from 'centrifuge'
import { useKeycloak } from '@react-keycloak/web'
import { Button } from './UI/button/button.js'

export const Auth = ({ children }: { children: ReactNode }) => {
  const { keycloak, initialized } = useKeycloak()
  const [connectionState, setConnectionState] = useState('disconnected')
  const [publishedData, setPublishedData] = useState('')
  const [centrifugeState, setcentrifuge] = useState()

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      const centrifuge = new Centrifuge('wss://chat.e-bus.site/connection/websocket', {
        token: keycloak.token,
        getToken: function () {
          return new Promise((resolve, reject) => {
            keycloak
              .updateToken(5)
              .then(function () {
                resolve(keycloak.token)
              })
              .catch(function (err) {
                reject(err)
                keycloak.logout()
              })
          })
        },
      })
      setcentrifuge(centrifuge)
      centrifuge.on('state', function (ctx) {
        setConnectionState(ctx.newState)
      })
      const userChannel = 'dialog#userId,receiverID'
      const sub = centrifuge.newSubscription(userChannel)
      sub
        .on('publication', function (ctx) {
          setPublishedData(JSON.stringify(ctx.data))
        })
        .subscribe()
      centrifuge.connect()
      return () => {
        centrifuge.disconnect()
      }
    }
  }, [keycloak, initialized])

  if (!initialized) {
    return null
  }

  return (
    <div style={{ height: '100%' }}>
      {keycloak.authenticated ? (
        <div style={{ height: '100%' }}>{children}</div>
      ) : (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'scale(4)',
          }}
        >
          <Button bg='primary' clickHandler={() => keycloak.login()}>
            Login
          </Button>
        </div>
      )}
    </div>
  )
}

/*
          <div>
            <p>
              Logged in as{' '}
              {keycloak.tokenParsed?.preferred_username +
                ', channel: #' +
                keycloak.tokenParsed?.sub}
            </p>
            {publishedData && <pre>{publishedData}</pre>}
          </div>
*/
