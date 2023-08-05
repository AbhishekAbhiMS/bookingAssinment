import React, { useState } from 'react';
import "./child.css"

const Child = ({ bookings }) => {
    const [facility, setFacility] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');






    function calculateBookingAmount(facility, startTime, endTime) {
        const facilityRates = {
            "Clubhouse": 100,
            "Tennis Court": 50
        };


        const startDate = new Date(`2000-01-01T${startTime}`);
        const endDate = new Date(`2000-01-01T${endTime}`);


        const durationInMilliseconds = endDate - startDate;
        const durationInHours = durationInMilliseconds / (1000 * 60 * 60);


        if (facilityRates.hasOwnProperty(facility)) {

            const ratePerHour = facilityRates[facility];
            const bookingAmount = ratePerHour * durationInHours;

            return bookingAmount;
        } else {

            return -1;
        }
    }

    function isFacilityAlreadyBooked(facility, date, startTime, endTime) {
        const conflictingBooking = bookings.find((booking) => {
            return (
                booking.facility === facility &&
                booking.date === date &&
                ((startTime >= booking.startTime && startTime < booking.endTime) ||
                    (endTime > booking.startTime && endTime <= booking.endTime) ||
                    (startTime <= booking.startTime && endTime >= booking.endTime))
            );
        });

        return !!conflictingBooking;
    }


    function bookFacility(facility, date, startTime, endTime) {


        if (isFacilityAlreadyBooked(facility, date, startTime, endTime)) {
            return "Booking Failed, Already Booked.";
        }

        const bookingAmount = calculateBookingAmount(facility, startTime, endTime);
        if (bookingAmount < 0) {
            return "Fill All The Details Properly..! ";
        }


        bookings.push({ facility, date, startTime, endTime });

        return bookingAmount!=-1?`Booked, Rs. ${bookingAmount}`:"Fill All The Details Please..! ";
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log();
        if (parseInt(startTime.slice(0, 2)) < 10 || parseInt(endTime.slice(0, 2)) > 22) {
            alert("give timing between 10 to 22");
            return
        }
        alert(bookFacility(facility, date, '' + `${startTime}`, '' + `${endTime}`));

    };


    return (
        <div className='main'>
            <h1> Booking Sports Area </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Facility:</label>
                    <select value={facility} onChange={(e) => setFacility(e.target.value)}>
                        <option value="">Select Facility</option>
                        <option value="Clubhouse">Clubhouse</option>
                        <option value="Tennis Court">Tennis Court</option>
                    </select>
                </div>

                <div>
                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    <label>Start Time:</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div>
                    <label>End Time:</label>
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
               <div> <button type="submit">Book</button></div>
            </form>

        </div>

    );
};

export default Child;














