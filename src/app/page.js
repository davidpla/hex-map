// app/page.js

import HexMap from '../components/HexMap'
import mockedMapData from '../data/mapData'

export default function HomePage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <HexMap mapData={mockedMapData} width={800} height={600} />
    </div>
  )
}