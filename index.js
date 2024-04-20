const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const doctors = [
  {
    id: 1,
    name: "Dr. Ramesh",
    location: "Hospital A",
    appointments: {
      Monday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Tuesday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Wednesday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Thursday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Friday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Saturday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Sunday: {
        "06:00pm": false,
        "07:00pm": false,
      },
    },
    id: 2,
    name: "Dr. Suresh",
    location: "Hospital A",
    appointments: {
      Monday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Tuesday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Wednesday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Thursday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Friday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Saturday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Sunday: {
        "06:00pm": false,
        "07:00pm": false,
      },
    },
  },
  {
    id: 3,
    name: "Dr. Srinivas",
    location: "Hospital A",
    appointments: {
      Monday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Tuesday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Wednesday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Thursday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Friday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Saturday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Sunday: {
        "06:00pm": false,
        "07:00pm": false,
      },
    },
  },
  {
    id: 4,
    name: "Dr. Padmavathi",
    location: "Hospital A",
    appointments: {
      Monday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Tuesday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Wednesday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Thursday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Friday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Saturday: {
        "06:00pm": true,
        "07:00pm": true,
      },

      Sunday: {
        "06:00pm": false,
        "07:00pm": false,
      },
    },
  },
];

// Define API endpoints here
// GET /api/doctors
app.get("/api/doctors", (req, res) => {
  res.json(doctors);
});

// GET /api/doctors/:doctorId
app.get("/api/doctors/:doctorId", (req, res) => {
  const doctorId = parseInt(req.params.doctorId);
  const doctor = doctors.find((doctor) => doctor.id === doctorId);
  if (!doctor) {
    res.status(404).json({ message: "Doctor not found" });
  } else {
    res.json({ id: doctor.id, name: doctor.name, location: doctor.location });
  }
});
app.get("/api/doctors/:doctorId/appointments", (req, res) => {
  const doctorId = parseInt(req.params.doctorId);
  const doctor = doctors.find((doctor) => doctor.id === doctorId);
  if (!doctor) {
    res.status(404).json({ message: "Doctor not found" });
  }
  res.json(doctor.appointments);
});
app.post("/api/doctors/:doctorId/:day/:time", (req, res) => {
  const doctorId = parseInt(req.params.doctorId);
  const day = req.params.day;
  const time = req.params.time;
  console.log(doctorId, day, time);
  const doctor = doctors.find((doctor) => doctor.id === doctorId);

  if (doctor) {
    if (doctor.appointments[day] && doctor.appointments[day][time]) {
      doctor.appointments[day][time] = false;
      res.json({
        message: `Appointment for Dr. ${doctor.name} on ${day} at ${time} has been booked`,
      });
    } else {
      res.status(404).json({ message: `Doctor is not available at ${time} ` });
    }
  } else {
    res.status(404).json({ message: "Doctor not found" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
