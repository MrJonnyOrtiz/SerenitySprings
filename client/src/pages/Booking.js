import { useDocumentTitle } from '../hooks/useDocumentTitle';

import { InlineWidget } from 'react-calendly';

export default function Booking() {
   useDocumentTitle('Serenity Springs - Booking');

   return (
      <div>
         <h3>
            For a free consultation, or to book an appointment
            <ol>
               <li>click "Make an appointment" below </li>{' '}
               <li>select an available date and time, then click Confirm</li>
               <li>
                  enter your name, email address, and any additional information
                  you'd like to share with us for us to consider before our
                  meeting
               </li>
            </ol>
            We will email you a Zoom link to meet you virtually on the date and
            time you chose for a free consultation or to book an appointment.
            <p> Thank you and we look forward to meeting you!</p>
         </h3>
         <InlineWidget url="https://calendly.com/yourserenitysprings" />
      </div>
   );
}
