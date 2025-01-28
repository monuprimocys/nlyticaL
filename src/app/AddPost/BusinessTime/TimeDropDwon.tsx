import "../style.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useState } from "react";
import dayjs from "dayjs";

function TimeDropDwon() {
  // States to track the selected start and end times
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Function to handle time change and format it as 12:00 AM/PM
  const handleTimeChange = (time, type) => {
    if (type === "start") {
      setStartTime(time);
    } else {
      setEndTime(time);
    }
  };

  const formatTime = (time) => {
    if (!time) return "";

    // Check if the time is midnight (00:00) and format it to 12:00 AM
    const formattedTime = dayjs(time).format("hh:mmA");
    return formattedTime === "12:00AM" ? "12:00 AM" : formattedTime;
  };

  return (
    <div className="grid w-full grid-cols-1 gap-6 pt-4 md:grid-cols-2">
      {/* Start time */}
      <div className="w-full">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={(newTime) => handleTimeChange(newTime, "start")}
              views={["hours"]}
              renderInput={(params) => (
                <input
                  {...params.inputProps}
                  value={formatTime(startTime)}
                  readOnly
                  className="MuiInputBase-input"
                />
              )}
              sx={{ width: "100%" }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>

      {/* End time */}
      <div className="w-full">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={(newTime) => handleTimeChange(newTime, "end")}
              views={["hours"]}
              renderInput={(params) => (
                <input
                  {...params.inputProps}
                  value={formatTime(endTime)}
                  readOnly
                  className="MuiInputBase-input"
                />
              )}
              sx={{ width: "100%" }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default TimeDropDwon;
