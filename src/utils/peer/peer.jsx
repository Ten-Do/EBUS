export const PeerToPeer = () => {
  const peer = new Peer()
  peer.on('open', function (id) {
    console.log('My peer ID is: ' + id)
  })
  let peercall
  peer.on('call', function (call) {
    // Answer the call, providing our mediaStream
    peercall = call
    document.getElementById('callinfo').innerHTML =
      "Входящий звонок <button onclick='callanswer()' >Принять</button><button onclick='callcancel()' >Отклонить</button>"
  })
  function callanswer() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(function (mediaStream) {
        var video = document.getElementById('myVideo')
        peercall.answer(mediaStream) // отвечаем на звонок и передаем свой медиапоток собеседнику
        //peercall.on ('close', onCallClose); //можно обработать закрытие-обрыв звонка
        video.srcObject = mediaStream //помещаем собственный медиапоток в объект видео (чтоб видеть себя)
        document.getElementById('callinfo').innerHTML =
          "Звонок начат... <button onclick='callclose()' >Завершить звонок</button>" //информируем, что звонок начат, и выводим кнопку Завершить
        video.onloadedmetadata = function (e) {
          //запускаем воспроизведение, когда объект загружен
          video.play()
        }
        setTimeout(function () {
          //входящий стрим помещаем в объект видео для отображения
          document.getElementById('remVideo').srcObject = peercall.remoteStream
          document.getElementById('remVideo').onloadedmetadata = function (e) {
            // и запускаем воспроизведение когда объект загружен
            document.getElementById('remVideo').play()
          }
        }, 1500)
      })
      .catch(function (err) {
        console.log(err.name + ': ' + err.message)
      })
  }
  function callToNode(peerId) {
    //вызов
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(function (mediaStream) {
        var video = document.getElementById('myVideo')
        peercall = peer.call(peerId, mediaStream) //звоним, указав peerId-партнера и передав свой mediaStream
        peercall.on('stream', function (stream) {
          //нам ответили, получим стрим
          setTimeout(function () {
            document.getElementById('remVideo').srcObject = peercall.remoteStream
            document.getElementById('remVideo').onloadedmetadata = function (e) {
              document.getElementById('remVideo').play()
            }
          }, 1500)
        })
        //  peercall.on('close', onCallClose);
        video.srcObject = mediaStream
        video.onloadedmetadata = function (e) {
          video.play()
        }
      })
      .catch(function (err) {
        console.log(err.name + ': ' + err.message)
      })
  }

  return (
    <>
      <div>
        <h3>Мой ID: </h3>
        <span id='myid'></span>
      </div>
      <input id='otherPeerId' type='text' placeholder='otherPeerId' />
      <button onClick={() => callToNode(document.getElementById('otherPeerId').value)}>
        Вызов
      </button>
      <br />
      <video id='myVideo' muted='muted' width='400px' height='auto'></video>
      <div id='callinfo'></div>
      <br />
      <video id='remVideo' width='400px' height='auto'></video>
    </>
  )
}
