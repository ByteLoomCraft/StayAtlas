import React from 'react';

const CancellationPolicy = () => {
    return (
        <div className="container">
            <h1>Cancellation Policy</h1>

            <h2>1. Standard Cancellation Policy</h2>
            <ul>
                <li>Guests are eligible for a full refund if the cancellation is made 21 days or more before the scheduled check-in date.</li>
                <li>A 50% refund will be provided for cancellations made between 21 to 11 days before check-in.</li>
                <li>Cancellations made less than 11 days before check-in will not be eligible for a refund.</li>
            </ul>

            <h2>2. Refund Processing & Cancellation Fees</h2>
            <ul>
                <li>A 5% cancellation fee will be charged to cover processing costs for all refunds. However, if the refund is processed as Stay Atlas travel credits, no cancellation fee will apply.</li>
                <li>Refunds will only be issued as travel credits if the original booking was made using any portion of travel credits.</li>
            </ul>

            <h2>3. Non-Cancellable Bookings & Peak Dates</h2>
            <ul>
                <li>If a non-cancellable coupon was used for the booking, the cancellation policy does not apply, and the Guest will not be eligible for any refund. However, rescheduling may be allowed as per the terms of the coupon.</li>
                <li>Cancellations are not permitted for peak dates, including:
                    <ul>
                        <li>Independence Day</li>
                        <li>Diwali</li>
                        <li>Christmas & New Year</li>
                        <li>Republic Day</li>
                    </ul>
                </li>
            </ul>

            <h2>4. Last-Minute Cancellations & Extenuating Circumstances</h2>
            <ul>
                <li>If a Guest cancels at the last minute due to unforeseen circumstances, Stay Atlas may issue an 85% refund only if the Property is rebooked for the same dates. If the Property remains un-booked, the cancellation will be treated as a no-show, and no refund will be issued.</li>
                <li>No refund will be given for partial payments made towards a booking.</li>
            </ul>

            <h2>5. Refund for Extra Charges</h2>
            <ul>
                <li>If there is a change in group size, extra bedding charges can be refunded only if Stay Atlas is informed at least 2 days prior to check-in. A 5% processing fee will be applicable.</li>
                <li>No refund for extra bedding charges will be processed for requests made within 2 days of check-in or after check-in.</li>
            </ul>

            <h2>6. Cancellation by Stay Atlas</h2>
            <ul>
                <li>In rare cases where Stay Atlas needs to cancel or reschedule a booking due to unavoidable circumstances, Guests will have the option to:
                    <ol>
                        <li>Receive a 100% refund to their original payment method (processed within 5-7 working days).</li>
                        <li>Opt for Stay Atlas travel credits, where they will receive the full booking amount + an additional 25% credit (excluding GST). These travel credits will be valid for 360 days from the date of issuance.</li>
                    </ol>
                </li>
            </ul>
        </div>
    );
}

export default CancellationPolicy;
