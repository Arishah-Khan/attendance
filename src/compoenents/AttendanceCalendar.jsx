// import React, { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const API_URL = "https://677cae354496848554c73dca.mockapi.io/students";

// // ✅ Fetch all attendance data
// const fetchAllAttendance = async () => {
//   console.log("📡 Fetching all attendance data...");
//   const response = await fetch(API_URL);
//   return response.json();
// };

// // ✅ Fetch attendance for selected date
// const fetchAttendance = async (date) => {
//   console.log("📡 Fetching attendance for date:", date);
//   const allData = await fetchAllAttendance();

//   // ✅ Filter data for selected date
//   const selectedData = allData.find((item) => item.date === date);
//   console.log("🎯 Filtered Data for Selected Date:", selectedData);

//   return selectedData ? selectedData.students : [];
// };

// // ✅ Save or Update Attendance
// const saveAttendance = async ({ date, students }) => {
//   console.log("📝 Saving attendance:", students);
//   const allData = await fetchAllAttendance();

//   let existingRecord = allData.find((item) => item.date === date);

//   if (existingRecord) {
//     // ✅ Update existing attendance
//     const updateResponse = await fetch(`${API_URL}/${existingRecord.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ date, students }),
//     });

//     return updateResponse.json();
//   } else {
//     // ✅ Create new attendance entry
//     const createResponse = await fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ date, students }),
//     });

//     return createResponse.json();
//   }
// };

// export default function AttendanceCalendar() {
//   const today = new Date().toLocaleDateString("en-CA");
//   const [selectedDate, setSelectedDate] = useState(today);
//   const queryClient = useQueryClient();

//   // ✅ Fetch all attendance records
//   const { data: allAttendance = [], isLoading: isLoadingAll } = useQuery({
//     queryKey: ["allAttendance"],
//     queryFn: fetchAllAttendance,
//   });

//   // ✅ Fetch today's attendance
//   const { data: attendance = [], isLoading: isLoadingDate } = useQuery({
//     queryKey: ["attendance", selectedDate],
//     queryFn: () => fetchAttendance(selectedDate),
//     enabled: !!selectedDate,
//   });

//   // ✅ Save Attendance Mutation
//   const addAttendance = useMutation({
//     mutationFn: saveAttendance,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["attendance", selectedDate]);
//       queryClient.invalidateQueries(["allAttendance"]);
//     },
//   });

//   // ✅ Function to Mark Attendance
//   const markAttendance = (status) => {
//     if (selectedDate !== today) {
//       alert("Aap sirf aaj ki attendance mark kar sakte hain!");
//       return;
//     }

//     let studentId;
//     let student;

//     console.log("📋 Checking in all records:", allAttendance);

//     while (true) {
//       studentId = prompt("Enter student ID:");
//       if (!studentId) return;

//       studentId = studentId.trim();
//       if (!studentId || isNaN(studentId)) {
//         alert("❌ Invalid input! Please enter a valid numeric ID.");
//         continue;
//       }

//       studentId = parseInt(studentId, 10);

//       console.log("🔍 Searching for student with ID:", studentId);

//       // ✅ Find student in ALL attendance records
//       const allStudents = allAttendance.flatMap((record) => record.students);
//       student = allStudents.find((s) => String(s.id) === String(studentId));

//       if (student) {
//         console.log("✅ Student Found:", student);
//         break;
//       } else {
//         alert("❌ Invalid Student ID! Please enter a correct ID.");
//         console.log("❌ Student not found in all records.");
//       }
//     }

//     // ✅ Check if student already exists in today's attendance
//     const todayAttendance = [...attendance];
//     const existingStudentIndex = todayAttendance.findIndex((s) => String(s.id) === String(studentId));

//     if (existingStudentIndex !== -1) {
//       todayAttendance[existingStudentIndex].status = status;
//       console.log("✅ Attendance Updated:", todayAttendance);
//     } else {
//       todayAttendance.push({ id: studentId, name: student.name, status });
//       console.log("➕ New Student Added:", todayAttendance);
//     }

//     // ✅ Save to API
//     addAttendance.mutate({
//       date: selectedDate,
//       students: todayAttendance,
//     });
//   };

//   return (
//     <div>
//       <Calendar 
//         onClickDay={(date) => setSelectedDate(date.toLocaleDateString("en-CA"))}
//         minDate={new Date(2025, 0, 21)}
//         maxDate={new Date()}
//       />

//       {selectedDate && (
//         <div>
//           <h3>Attendance for {selectedDate}</h3>
//           {isLoadingDate ? (
//             <p>Loading...</p>
//           ) : attendance.length > 0 ? (
//             <ul>
//               {attendance.map((student) => (
//                 <li key={student.id}>
//                   {student.name} - <strong>{student.status}</strong>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No attendance recorded</p>
//           )}

//           <button onClick={() => markAttendance("Present")}>Mark Present</button>
//           <button onClick={() => markAttendance("Absent")}>Mark Absent</button>
//           <button onClick={() => markAttendance("Leave")}>Mark Leave</button>
//         </div>
//       )}
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const API_URL = "https://677cae354496848554c73dca.mockapi.io/students";

// // ✅ Fetch all attendance data
// const fetchAllAttendance = async () => {
//   console.log("📡 Fetching all attendance data...");
//   const response = await fetch(API_URL);
//   return response.json();
// };

// // ✅ Fetch attendance for selected date
// const fetchAttendance = async (date) => {
//   console.log("📡 Fetching attendance for date:", date);
//   const allData = await fetchAllAttendance();

//   // ✅ Filter data for selected date
//   const selectedData = allData.find((item) => item.date === date);
//   console.log("🎯 Filtered Data for Selected Date:", selectedData);

//   return selectedData ? selectedData.students : [];
// };

// // ✅ Save or Update Attendance
// const saveAttendance = async ({ date, students }) => {
//   console.log("📝 Saving attendance:", students);
//   const allData = await fetchAllAttendance();

//   let existingRecord = allData.find((item) => item.date === date);

//   if (existingRecord) {
//     // ✅ Update existing attendance
//     const updateResponse = await fetch(`${API_URL}/${existingRecord.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ date, students }),
//     });

//     return updateResponse.json();
//   } else {
//     // ✅ Create new attendance entry
//     const createResponse = await fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ date, students }),
//     });

//     return createResponse.json();
//   }
// };

// export default function AttendanceCalendar() {
//   const today = new Date().toLocaleDateString("en-CA");
//   const [selectedDate, setSelectedDate] = useState(today);
//   const queryClient = useQueryClient();

//   // ✅ Fetch all attendance records
//   const { data: allAttendance = [], isLoading: isLoadingAll } = useQuery({
//     queryKey: ["allAttendance"],
//     queryFn: fetchAllAttendance,
//   });

//   // ✅ Fetch today's attendance
//   const { data: attendance = [], isLoading: isLoadingDate } = useQuery({
//     queryKey: ["attendance", selectedDate],
//     queryFn: () => fetchAttendance(selectedDate),
//     enabled: !!selectedDate,
//   });

//   // ✅ Save Attendance Mutation
//   const addAttendance = useMutation({
//     mutationFn: saveAttendance,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["attendance", selectedDate]);
//       queryClient.invalidateQueries(["allAttendance"]);
//     },
//   });

//   // ✅ Function to Mark Attendance
//   const markAttendance = (status) => {
//     if (selectedDate !== today) {
//       alert("Aap sirf aaj ki attendance mark kar sakte hain!");
//       return;
//     }

//     let studentId;
//     let student;

//     console.log("📋 Checking in all records:", allAttendance);

//     while (true) {
//       studentId = prompt("Enter student ID:");
//       if (!studentId) return;

//       studentId = studentId.trim();
//       if (!studentId || isNaN(studentId)) {
//         alert("❌ Invalid input! Please enter a valid numeric ID.");
//         continue;
//       }

//       studentId = parseInt(studentId, 10);

//       console.log("🔍 Searching for student with ID:", studentId);

//       // ✅ Find student in ALL attendance records
//       const allStudents = allAttendance.flatMap((record) => record.students);
//       student = allStudents.find((s) => String(s.id) === String(studentId));

//       if (student) {
//         console.log("✅ Student Found:", student);
//         break;
//       } else {
//         alert("❌ Invalid Student ID! Please enter a correct ID.");
//         console.log("❌ Student not found in all records.");
//       }
//     }

//     // ✅ Check if student already exists in today's attendance
//     const todayAttendance = [...attendance];
//     const existingStudentIndex = todayAttendance.findIndex(
//       (s) => String(s.id) === String(studentId)
//     );

//     if (existingStudentIndex !== -1) {
//       todayAttendance[existingStudentIndex].status = status;
//       console.log("✅ Attendance Updated:", todayAttendance);
//     } else {
//       todayAttendance.push({ 
//         id: student.id,  // ✅ ID Ensure
//         name: student.name, 
//         status 
//       });
//       console.log("➕ New Student Added:", todayAttendance);
//     }

//     // ✅ Save to API
//     addAttendance.mutate({
//       date: selectedDate,
//       students: todayAttendance,
//     });
//   };

//   return (
//     <div>
//       <Calendar 
//         onClickDay={(date) => setSelectedDate(date.toLocaleDateString("en-CA"))}
//         minDate={new Date(2025, 0, 21)}
//         maxDate={new Date()}
//       />

//       {selectedDate && (
//         <div>
//           <h3>Attendance for {selectedDate}</h3>
//           {isLoadingDate ? (
//             <p>Loading...</p>
//           ) : attendance.length > 0 ? (
//             <ul>
//               {attendance.map((student) => (
//                 <li key={student.id}>
//                   <strong>ID:</strong> {student.id} - <strong>Name:</strong> {student.name} - <strong>Status:</strong> {student.status}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No attendance recorded</p>
//           )}

//           <button onClick={() => markAttendance("Present")}>Mark Present</button>
//           <button onClick={() => markAttendance("Absent")}>Mark Absent</button>
//           <button onClick={() => markAttendance("Leave")}>Mark Leave</button>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { useTransition, animated } from "@react-spring/web";

const API_URL = "https://677cae354496848554c73dca.mockapi.io/students";

const fetchAllAttendance = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

const fetchAttendance = async (date) => {
  const allData = await fetchAllAttendance();
  const selectedData = allData.find((item) => item.date === date);
  return selectedData ? selectedData.students : [];
};

const saveAttendance = async ({ date, students }) => {
  const allData = await fetchAllAttendance();
  let existingRecord = allData.find((item) => item.date === date);

  if (existingRecord) {
    const updateResponse = await fetch(`${API_URL}/${existingRecord.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, students }),
    });

    return updateResponse.json();
  } else {
    const createResponse = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, students }),
    });

    return createResponse.json();
  }
};

export default function AttendanceCalendar() {
  const today = new Date().toLocaleDateString("en-CA");
  const [selectedDate, setSelectedDate] = useState(today);
  const queryClient = useQueryClient();

  const { data: allAttendance = [], isLoading: isLoadingAll } = useQuery({
    queryKey: ["allAttendance"],
    queryFn: fetchAllAttendance,
  });

  const { data: attendance = [], isLoading: isLoadingDate } = useQuery({
    queryKey: ["attendance", selectedDate],
    queryFn: () => fetchAttendance(selectedDate),
    enabled: !!selectedDate,
  });

  const addAttendance = useMutation({
    mutationFn: saveAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries(["attendance", selectedDate]);
      queryClient.invalidateQueries(["allAttendance"]);
    },
  });

  const deleteStudent = (studentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this student's attendance record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedAttendance = attendance.filter(
          (student) => student.id !== studentId
        );

        addAttendance.mutate({
          date: selectedDate,
          students: updatedAttendance,
        });

        Swal.fire(
          "Deleted!",
          "The student's attendance has been deleted.",
          "success"
        );
      }
    });
  };

  const markAttendance = async (status) => {
    if (selectedDate !== today) {
      Swal.fire("Oops!", "You can only mark today's attendance!", "error");
      return;
    }

    let studentId;
    let student;

    while (true) {
      const { value: input } = await Swal.fire({
        title: "Enter student ID",
        input: "text",
        inputLabel: "Student ID (between 1 and 10)",
        inputValidator: (value) => {
          if (!value || isNaN(value)) {
            return "❌ Please enter a valid numeric ID!";
          }
          const numId = parseInt(value, 10);
          if (numId < 1 || numId > 10) {
            return "❌ ID must be between 1 and 10!";
          }
          studentId = numId;
          return null;
        },
        showCancelButton: true,
        confirmButtonText: "Submit",
      });

      if (!input) return;

      const allStudents = allAttendance.flatMap((record) => record.students);
      student = allStudents.find((s) => String(s.id) === String(studentId));

      if (student) {
        break;
      } else {
        Swal.fire("❌ Invalid Student ID!", "Please enter a correct ID.", "error");
      }
    }

    const todayAttendance = [...attendance];
    const existingStudentIndex = todayAttendance.findIndex(
      (s) => String(s.id) === String(studentId)
    );

    if (existingStudentIndex !== -1) {
      todayAttendance[existingStudentIndex].status = status;
    } else {
      todayAttendance.push({
        id: student.id,
        name: student.name,
        status,
      });
    }

    todayAttendance.sort((a, b) => a.id - b.id);

    addAttendance.mutate({
      date: selectedDate,
      students: todayAttendance,
    });
  };

  const transitions = useTransition(attendance, {
    key: (student) => student.id,
    from: { opacity: 0, transform: "translateX(-50%)" },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: { opacity: 0, transform: "translateX(50%)" },
    config: { tension: 300, friction: 25 },
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-center my-6">
        <Calendar
          onClickDay={(date) => setSelectedDate(date.toLocaleDateString("en-CA"))}
          minDate={new Date(2025, 0, 21)}
          maxDate={new Date()}
          className="w-full sm:w-96 md:w-80 lg:w-96 xl:w-96 rounded-lg shadow-md bg-white"
        />
      </div>

      {selectedDate && (
        <div className="mt-8 max-w-[900px] mx-auto">
          <h3 className="py-4 text-xl sm:text-3xl font-semibold text-center text-blue-600 mb-6">
            Attendance for <span className="font-bold text-gray-800">{selectedDate}</span>
          </h3>

          {isLoadingDate ? (
            <div className="flex justify-center items-center my-6 ">
              <ClipLoader color="#3498db" size={50} />
            </div>
          ) : attendance.length > 0 ? (
            <ul className="space-y-3 overflow-x-auto">
              {transitions((style, student) => (
                <animated.li
                  key={student.id}
                  style={style}
                  className="bg-white p-4 rounded-lg  flex justify-between items-center flex-wrap border border-gray-200"
                >
                  <div className="flex gap-5 items-center">
                    <div className="text-lg font-semibold text-gray-800">
                      <span className="text-blue-500">ID:</span> {student.id}
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      <span className="text-green-500">Name:</span> {student.name}
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                      <span className="text-yellow-500">Status:</span> {student.status}
                    </div>
                  </div>

                  {selectedDate === today && (
                    <button
                      onClick={() => deleteStudent(student.id)}
                      className="flex items-center text-red-500 hover:text-red-700 mt-2 sm:mt-0"
                    >
                      <FaTrashAlt className="mr-2" /> Delete
                    </button>
                  )}
                </animated.li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No attendance recorded</p>
          )}

          {selectedDate === today && (
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button
                onClick={() => markAttendance("Present")}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 w-full sm:w-auto"
              >
                Mark Present
              </button>
              <button
                onClick={() => markAttendance("Absent")}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-200 w-full sm:w-auto"
              >
                Mark Absent
              </button>
              <button
                onClick={() => markAttendance("Leave")}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-all duration-200 w-full sm:w-auto"
              >
                Mark Leave
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
