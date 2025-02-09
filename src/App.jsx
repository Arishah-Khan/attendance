import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AttendanceCalendar from "./compoenents/AttendanceCalendar";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
      <h1 class=" py-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 text-center mb-8">
  📅 Attendance System
</h1>
        <AttendanceCalendar />
      </div>
    </QueryClientProvider>
  );
}
