import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import GoogleCalendar from "./components/Calendar";

function App() {
  return (
    <div className="App">
      <GoogleCalendar />
    </div>
  );
}

export default App;
