import React from 'react'

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d4af75] to-[#0e3226] text-white py-8">
      <div className="max-w-[90%] mx-auto my-5 p-5 md:p-8 bg-black bg-opacity-70 rounded-lg shadow-md animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold mb-5 text-center text-white animate-slideIn">Privacy Policy</h1>
        
        <p className="mb-5 animate-fadeInUp">
          This Privacy Policy is an electronic record under the provisions of the Information Technology Act, 2000, and applicable rules. Being a computer-generated document, it does not require physical or digital signatures.
        </p>
        
        <h2 className="text-2xl md:text-3xl font-bold mt-6 text-white animate-fadeInUp">Information Collection</h2>
        <p className="mb-5 animate-fadeInUp">
          At Stay Atlas, we collect various types of information to provide and improve our services. This includes personal information such as your <strong>name</strong>, <strong>email address</strong>, <strong>phone number</strong>, and <strong>payment details</strong> when you make a booking or inquiry. We also collect non-personal information such as <strong>browser type</strong>, <strong>IP address</strong>, and <strong>usage data</strong> to enhance user experience and analyze trends.
        </p>
        
        <h2 className="text-2xl md:text-3xl font-bold mt-6 text-white animate-fadeInUp">Use of Information</h2>
        <p className="mb-2 animate-fadeInUp">The information we collect is used for various purposes, including:</p>
        <ul className="list-disc ml-6 mb-5">
          <li className="mb-2 text-lg">To provide and maintain our services.</li>
          <li className="mb-2 text-lg">To notify you about changes to our services.</li>
          <li className="mb-2 text-lg">To allow you to participate in interactive features of our service when you choose to do so.</li>
          <li className="mb-2 text-lg">To provide customer support and respond to inquiries.</li>
          <li className="mb-2 text-lg">To gather analysis or valuable information so that we can improve our services.</li>
          <li className="mb-2 text-lg">To monitor the usage of our services.</li>
          <li className="mb-2 text-lg">To detect, prevent, and address technical issues.</li>
        </ul>
        
        <h2 className="text-2xl md:text-3xl font-bold mt-6 text-white animate-fadeInUp">Data Security</h2>
        <p className="mb-5 animate-fadeInUp">
          We are committed to ensuring the security of your personal information. We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. These measures include <strong>encryption</strong>, <strong>firewalls</strong>, and <strong>secure server hosting</strong>.
        </p>
        
        <h2 className="text-2xl md:text-3xl font-bold mt-6 text-white animate-fadeInUp">Consent</h2>
        <p className="mb-5 animate-fadeInUp">
          By accessing or using our website, you explicitly consent to the collection, use, and disclosure of your personal information as described in this Privacy Policy. This Privacy Policy forms an integral part of the Terms and Conditions governing the use of our services.
        </p>
        
        <h2 className="text-2xl md:text-3xl font-bold mt-6 text-white animate-fadeInUp">Changes to This Privacy Policy</h2>
        <p className="mb-5 animate-fadeInUp">
          Please note that Stay Atlas reserves the right to modify or update this Privacy Policy at any time without prior notice. We encourage users to review this policy periodically to stay informed about any changes. Your continued use of the service after any modifications to the Privacy Policy will constitute your acknowledgment of the modifications and your consent to abide by and be bound by the modified policy.
        </p>
        
        <h2 className="text-2xl md:text-3xl font-bold mt-6 text-white animate-fadeInUp">Independent Brand</h2>
        <p className="mb-5 animate-fadeInUp">
          Stay Atlas operates as an independent brand, and this Privacy Policy applies to all its services and platforms. We are dedicated to maintaining the trust of our users and ensuring that their personal information is handled with care.
        </p>
      </div>
    </div>
  )
}

export default Privacy