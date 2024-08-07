import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "./Homepage";
import SliderMonths from "./components/SliderMonths";
import PageMonth from "./components/PageMonth";

function App() {
  return (
    <>
      <BrowserRouter>
        <SliderMonths />
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="month/:monthId" element={<PageMonth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
