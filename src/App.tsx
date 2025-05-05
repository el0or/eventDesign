import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from "./components/pages/Auth"
import Register from "./components/pages/Register"
import Events from "./components/pages/Events"
import Favorite from "./components/pages/Favorite"
import EventsCardPage from "./components/pages/EventCardPage"
import Category from "./components/pages/Category"
import Statements from "./components/pages/statements"
import Settings from "./components/pages/Settings"
import EventDetails from './components/EventDetails';
import EventListByCategory from './components/pages/EventListByCategory';

export default function App() {
  return (
      <div className="wrapper">        
        <Routes>
          <Route path="/" element={<Auth/>} />
          <Route path="/Events" element={<Events/>} />
          <Route path="/Favorite" element={<Favorite/>} />
          <Route path="/Category" element={<Category/>} />
          {/* <Route path="/statements" element={<Statements/>} /> */}
          <Route path="/Settings" element={<Settings/>} />
          <Route path="/EventCardPage" element={<EventsCardPage/>} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:categoryId" element={<EventListByCategory />} />
        </Routes>
      </div>
  )
}