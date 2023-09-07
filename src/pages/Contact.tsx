import React from "react"

export default function Contact () {
    return (
        <div id="contact-page">
            <h1>Contact Us</h1>
            <div id="contact-page-info"> 
                <p>
                    <span className="material-symbols-outlined">
                        call
                    </span>+421 000 000 000
                </p>
                <p>
                    <span className="material-symbols-outlined">
                        mail
                    </span>florbalshop@gmail.com
                </p>
                <p>
                    <span className="material-symbols-outlined">
                        home
                    </span>Zamračená 4, 851 02 Bratislava  
                </p>
            </div>
            <div id="hours-table">
                <table>
                    <tr>
                        <th>Day</th>
                        <th>Opening Hours</th>
                    </tr>
                    <tr>
                        <td>Monday</td>
                        <td>8:00 - 12:00 13:00 - 20:00</td>
                    </tr>
                    <tr>
                        <td>Tuesday</td>
                        <td>8:00 - 12:00 13:00 - 20:00</td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td>8:00 - 12:00 13:00 - 20:00</td>
                    </tr>
                    <tr>
                        <td>Thursday</td>
                        <td>8:00 - 12:00 13:00 - 20:00</td>
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td>8:00 - 12:00 13:00 - 18:00</td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td>10:00 - 12:00 13:00 - 18:00</td>
                    </tr>
                    <tr>
                        <td>Sunday</td>
                        <td>zatvorené</td>
                    </tr>
                </table>
            </div>
        </div>
        
    )
}