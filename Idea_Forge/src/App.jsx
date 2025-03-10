// import { useState } from 'react'
import './App.css'

// import Calendar from '@toast-ui/react-calendar';
// import '@toast-ui/calendar/dist/toastui-calendar.min.css';
// import { MyCalender } from './Components/MyCalender';
import GoogleCalendar from './components/GoogleCalender';

function App() {

  return (
    <div>
      {/* <MyCalender /> */}
      <GoogleCalendar />
    </div>
  )
}

export default App
