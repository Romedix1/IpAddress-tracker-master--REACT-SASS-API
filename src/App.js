import { useState, useForm, useEffect, useRef } from 'react'
import './App.scss';
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import Markerposition from './Markerposition'

function App() {
  const [data, setData] = useState({
    ipAddress: "8.8.8.8",
    location: "Mountain View",
    timezone: "-07:00",
    isp: "Google LLC",
    locationLat: "37.38605",
    locationLng: "-122.08385"
})

const inputRef = useRef(null)



const dataChange = (e) => {
  e.preventDefault()
  const ipValue =  inputRef.current.value
  // console.log(ipValue)

  fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=${ipValue}`)
  .then(res=> res.json())
  // .then(infoS=>  console.log(infoS))
  .then(info=>  setData({
    ipAddress: info.ip,
    location: info.location.city,
    timezone: info.location.timezone,
    isp: info.isp,
    locationLat: info.location.lat,
    locationLng: info.location.lng
  }))


  // console.log(data)
}

  return (
    <main>
      <section className='top-content'>
        <h1>IP Address Tracker</h1>
        
        <form>
          <input type="text" ref={inputRef}/>
          <button onClick={dataChange} className='top--button'>
            <img src='./images/icon-arrow.svg' alt='arrow icon' />
          </button>
        </form>

        <article className='top--main-data'>
          <div>
          <h2>Ip address</h2>
          <p>{data.ipAddress}</p>
          </div>

          <div>
          <h2>Location</h2>
          <p>{data.location}</p>
          </div>

          <div>
          <h2>Timezone</h2>
          <p>{data.timezone}</p>
          </div>

          <div>
          <h2>Isp</h2>
          <p className='last-p'>{data.isp}</p>
          </div>
        </article>
      </section>

      <section className='bottom-section'>
 
          <MapContainer 
            center={[data.locationLat, data.locationLng]} 
            zoom={13} 
            scrollWheelZoom={true} 
            style={{height:"800px", width: "100vw"}}>

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markerposition data={data} />
          </MapContainer>
        
      </section>
    </main>
  );
}

export default App;
