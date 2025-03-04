import { useState } from 'react'
import './App.css'

import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Calendar
        height="900px"
        view="month"
        month={{
          dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          visibleWeeksCount: 3,
        }}
        // calendars={calendars}
        // events={initialEvents}
        // onAfterRenderEvent={onAfterRenderEvent}
      />
    </div>
  )
}

export default App
