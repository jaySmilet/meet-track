import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { HashRouter, Route, Routes } from "react-router-dom";

import MeetTable from "./components/MeetTable/MeetTable";
import Remarks from "./components/Remarks/Remarks";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MeetTable />} />
        <Route path="/remarks" element={<Remarks />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
