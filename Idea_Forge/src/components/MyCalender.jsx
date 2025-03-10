import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const MyCalender = () => {
  const calendars = [{ id: 'cal1', name: 'GeonwooChoi' }];
  const initialEvents = [
    {
      id: '1',
      calendarId: 'cal1',
      title: 'Lunch',
      category: 'time',
      start: '2025-03-28T12:00:00',
      end: '2025-03-28T13:30:00',
    },
    {
      id: '2',
      calendarId: 'cal1',
      title: 'Coffee Break',
      category: 'time',
      start: '2022-06-28T15:00:00',
      end: '2022-06-28T15:30:00',
    },
  ];

  const onAfterRenderEvent = (event) => {
    console.log(event.title);
  };

  return (
    <div>
      <Calendar
        calendarType='gregory'
      // height="900px"
      // view="month"
      // month={{
      //   dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      //   visibleWeeksCount: 3,
      // }}
      // calendars={calendars}
      // events={initialEvents}
      // onAfterRenderEvent={onAfterRenderEvent}
      />
    </div>
  );
}