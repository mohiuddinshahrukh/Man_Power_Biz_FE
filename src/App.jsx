import { Route, Routes } from 'react-router-dom'
import './App.css'
import Appshell from './components/dashboard/Appshell'
import { Dashboard } from './components/dashboard/Dashboard'
import ViewUser from './components/users/ViewUser'
import AddUser from './components/users/AddUser'
import ChatScreen from './components/chats/ChatScreen'
import AddServiceCategory from './components/serviceCategories/AddServiceCategory'
import ViewServiceCategory from './components/serviceCategories/ViewServiceCategory'
import AddPackages from './components/packages/AddPackages'
import ViewPackages from './components/packages/ViewPackages'
import AddBooking from './components/bookings/AddBooking'
import ViewBooking from './components/bookings/ViewBooking'
import AddPayment from './components/payment/AddPayment'
import ViewPayment from './components/payment/ViewPayment'
import AddComplaint from './components/complaint/AddComplaint'
import ViewComplaint from './components/complaint/ViewComplaint'
import Policy from './components/policies/Policy'
import Settings from './components/settings/Settings'
import ReviewsAndFeebacks from './components/review_feedback/ReviewsAndFeebacks'
import { BadRequest } from './components/errorpages/BadRequest'
import FrequentlyAskedQuestions from './components/frequentlyAskedQuestions/FrequentlyAskedQuestions'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Appshell />} >
        <Route path='/' element={<Dashboard />} />
        <Route path='/adduser' element={<AddUser />} />
        <Route path='/viewuser' element={<ViewUser />} />
        <Route path='/addServiceCategory' element={<AddServiceCategory />} />
        <Route path='/viewServiceCategories' element={<ViewServiceCategory />} />
        <Route path='/addService' element={<AddServiceCategory />} />
        <Route path='/viewServices' element={<ViewServiceCategory />} />
        <Route path='/addPackage' element={<AddPackages />} />
        <Route path='/viewPackages' element={<ViewPackages />} />
        <Route path='/addBooking' element={<AddBooking />} />
        <Route path='/viewBookings' element={<ViewBooking />} />
        <Route path='/addPayment' element={<AddPayment />} />
        <Route path='/viewPayments' element={<ViewPayment />} />
        <Route path="/chats" element={<ChatScreen />} />
        <Route path='/addComplaint' element={<AddComplaint />} />
        <Route path='/viewComplaints' element={<ViewComplaint />} />
        <Route path="/policies" element={<Policy />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reviewsAndFeedbacks" element={<ReviewsAndFeebacks />} />
        <Route path="/faq" element={<FrequentlyAskedQuestions />} />
        <Route path='/*' element={<BadRequest />} />
      </Route>
    </Routes>
  )
}

export default App
