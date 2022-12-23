import { useDocumentTitle } from '../hooks/useDocumentTitle';

function About() {
   useDocumentTitle('Serenity Springs - About');

   return (
      <div className="center">
         <h2>About Us</h2>
         <img
            id="owners"
            src="https://serenity-springs-assets.s3.amazonaws.com/AboutUs.jpeg"
            alt="Owners' Ariana and Briana"
         />
         <p>Owners: Ariana on the left, Briana on the right</p>
         <h3>
            Serenity springs is run by sisters Arianna and Brianna Ortiz. They
            both graduated from Erwin Technical College; Arianna with a license
            in Cosmetology and Brianna in Massage Therapy.
         </h3>{' '}
         <h3>
            We started this journey because we’ve always loved helping people.
            Our desire is to help people feel their best from the inside out
            while offering the cleanest products and services!{' '}
         </h3>
      </div>
   );
}

export default About;
