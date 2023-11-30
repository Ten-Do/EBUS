import { useState, useEffect } from 'react'
import { Centrifuge } from 'centrifuge'
import { useKeycloak } from '@react-keycloak/web'

export const Auth = () => {
  const { keycloak, initialized } = useKeycloak()
  const [connectionState, setConnectionState] = useState('disconnected')
  const [publishedData, setPublishedData] = useState('')
  const [centrifugeState, setcentrifuge] = useState()
  const stateToEmoji = {
    disconnected: '🔴',
    connecting: '🟠',
    connected: '🟢',
  }

  useEffect(() => {
    if (!initialized || !keycloak.authenticated) {
      return
    }
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
  }, [keycloak, initialized])

  if (!initialized) {
    return null
  }

  return (
    <div>
      <header>
        <p>
          SSO with Keycloak and Centrifugo &nbsp;
          <span className={'connectionState ' + connectionState}>
            {stateToEmoji[connectionState]}
          </span>
        </p>
        {keycloak.authenticated ? (
          <div>
            <p>
              Logged in as{' '}
              {keycloak.tokenParsed?.preferred_username +
                ', channel: #' +
                keycloak.tokenParsed?.sub}
            </p>
            {publishedData && <pre>{publishedData}</pre>}
            <button type='button' onClick={() => keycloak.logout()}>
              Logout
            </button>
          </div>
        ) : (
          <button type='button' onClick={() => keycloak.login()}>
            Login
          </button>
        )}
      </header>
    </div>
  )
}
