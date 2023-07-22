export function generateTimeOptions() {
  const interval = 15;
  const startTime = new Date();
  startTime.setMinutes(Math.ceil(startTime.getMinutes() / interval) * interval);
  const endTime = new Date(startTime);
  endTime.setHours(21, 59, 59, 999);

  const options = [];
  while (startTime <= endTime) {
    const formattedTime = startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const nextTime = new Date(startTime);
    nextTime.setTime(nextTime.getTime() + interval * 60000);
    const formattedNextTime = nextTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    options.push({ value: `${formattedTime} - ${formattedNextTime}`, label: `${formattedTime} - ${formattedNextTime}` });
    startTime.setTime(startTime.getTime() + interval * 60000);
  }

  return options;
}