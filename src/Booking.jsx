import React, { useState, useEffect, useContext } from 'react';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import UserContext from './UserContext';

function Bookings() {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const bookingsRef = ref(database, `bookings`);

    const handleNewBooking = snapshot => {
      const allBookings = [];
      snapshot.forEach(childSnapshot => {
        allBookings.push(childSnapshot.val());
      });
      setBookings(allBookings);
    };

    onValue(bookingsRef, handleNewBooking);

    return () => off(bookingsRef, 'value', handleNewBooking);
  }, []);

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            Email: {booking.userEmail}, Date: {booking.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bookings;
