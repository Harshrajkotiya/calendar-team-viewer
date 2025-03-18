import TeamScheduler from "@/app/components/TeamScheduler";
import { CalendarProvider } from "@/app/context/CalendarContext";

export default function Home() {
  return (
    <div>
      <CalendarProvider>
        <TeamScheduler />
      </CalendarProvider>
    </div>
  );
}
