import React from "react";
import {createRoot} from 'react-dom/client'
import App from './App'
const rootelement = document.getElementById('root')
const root = createRoot(rootelement)

root.render(
  <App/>
)
// const routing = (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Process />} />
//       <Route path="/add" element={<User />} />
//     </Routes>
//   </Router>
// )
//ReactDOM.render(routing, document.getElementById('root'));