import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-[90%] md:max-w-5xl mx-auto p-6 md:p-10 bg-white text-black rounded-xl shadow-lg animate-fadeIn border border-black/20 shadow-xl">
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6 border-b border-black/20 pb-2 animate-slideIn">
          Terms and Conditions
        </h1>
        
        <p className="mb-6 animate-fadeInUp">
          For both online and offline bookings made through our platform, the terms used in these Terms and Conditions shall have the following meanings:
        </p>

        <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 animate-slideIn border-b border-black/20 pb-1">
          Definitions
        </h2>
        
        <ul className="list-disc ml-5 mb-8">
          {[
            ["Property/Properties", "Refers to villas, bungalows, farmhouses, homestays, serviced apartments, and individual rooms available for reservation through Stay Atlas's booking channels."],
            ["Guest/Guests", "Individuals, businesses, or entities that show interest in booking a Property via Stay Atlas's booking platforms. Guests may also be addressed as \"you\" or \"you're\" depending on the context."],
            ["Booking", "A confirmed reservation by a Guest for accommodation at a Stay Atlas Property."],
            ["Check-In", "The designated date and time by which the Guest must complete all check-in procedures as required by Stay Atlas before gaining access to the reserved Property."],
            ["Check-Out", "The scheduled date and time by which the Guest must vacate the Property after completing all check-out formalities as stipulated by Stay Atlas."],
            ["Booking Duration", "The total period between the Guest's Check-In and Check-Out."],
            ["Booking Fee", "The full amount payable by the Guest to Stay Atlas for securing a reservation, as per the payment terms communicated by Stay Atlas."],
            ["Booking Confirmation", "A formal communication (email/message) sent by Stay Atlas upon receipt of the initial payment (Advance), containing all booking details, including the Guest's name, number of occupants, Check-In and Check-Out dates, Property details, number of rooms, total Booking Fee, and Security Deposit amount (if applicable), along with due dates for payment. The Guest must complete the payment of the full Booking Fee within the stipulated period, failing which the Booking may be considered invalid despite receiving the Booking Confirmation. Proof of full payment must be presented at the Property during Check-In."],
            ["Advance Payment", "A non-refundable deposit required from the Guest to temporarily hold a booking for a specified Property."],
            ["Security Deposit", "An additional refundable amount that Guests may be required to pay before Check-In, depending on the Property and booking terms. This deposit serves as a safeguard against any damages to the Property, furniture, or items within, as well as for any additional charges incurred during the Guest's stay. Any deductions, if applicable, will be communicated to the Guest post Check-Out."],
            ["High-Demand Dates", "Refers to peak travel periods such as festive seasons (e.g., Christmas, New Year's Eve, Diwali) and long weekends, where special pricing and booking policies may apply."]
          ].map(([term, description], index) => (
            <li key={index} className="mb-4 animate-fadeInUp">
              <strong className="text-black">({String.fromCharCode(97 + index)}) {term}</strong> – {description}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 animate-slideIn border-b border-black/20 pb-1">
          Eligibility for Booking
        </h2>
        <p className="mb-6 animate-fadeInUp">
          The use of Stay Atlas's booking channels to make a reservation for any Property is restricted to individuals who are legally capable of entering into binding agreements under the Indian Contract Act, 1872. Individuals classified as 'incompetent to contract' as per the provisions of the Indian Contract Act, 1872, are not permitted to utilize Stay Atlas's booking services.
        </p>
        </div>
    </div>
  );
};

export default TermsAndConditions;
