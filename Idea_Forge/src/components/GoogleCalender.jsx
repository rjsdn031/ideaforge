import React, { useEffect, useState } from "react";

const calendarSrc = import.meta.env.VITE_GOOGLE_CALENDAR_SRC;

const GoogleCalendar = () => {
  return (
    <iframe
        src={calendarSrc}
        style={{ border: 0 }}
        width="800"
        height="800"
      ></iframe>
  );
};

export default GoogleCalendar;