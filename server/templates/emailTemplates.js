const getGuestBookingTemplate = (bookingData) => {
    // Ensure bookingData exists
    if (!bookingData) return '<p>Booking data not available</p>';

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; padding: 20px; }
        .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .email-header { background: linear-gradient(135deg, #16a085 0%, #2c3e50 100%); color: white; padding: 30px; text-align: center; }
        .email-header h1 { font-size: 28px; font-weight: 600; margin-bottom: 10px; }
        .email-body { padding: 30px; }
        .greeting { font-size: 18px; color: #2c3e50; margin-bottom: 20px; }
        .booking-card { background: #f8f9fa; border-radius: 12px; padding: 25px; margin: 20px 0; border-left: 4px solid #16a085; }
        .booking-title { color: #16a085; font-size: 20px; margin-bottom: 15px; font-weight: 600; }
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .detail-item { margin-bottom: 8px; }
        .detail-label { font-weight: 600; color: #2c3e50; }
        .detail-value { color: #5a6c7d; }
        .host-info { background: white; border: 1px solid #eaeaea; border-radius: 12px; padding: 20px; margin: 20px 0; }
        .transaction-id { background: #fff8e1; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; border: 1px dashed #ffd54f; font-weight: 600; }
        .email-footer { text-align: center; color: #7f8c8d; font-size: 14px; padding: 20px; border-top: 1px solid #eaeaea; margin-top: 20px; }
        .emoji { font-size: 18px; margin-right: 5px; }
        @media (max-width: 480px) {
            .detail-grid { grid-template-columns: 1fr; }
            .email-body { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>🎉 Booking Confirmed!</h1>
            <p>Your StayNest reservation is confirmed</p>
        </div>
        
        <div class="email-body">
            <div class="greeting">
                Hi <strong>${bookingData?.guest?.name || 'Guest'}</strong>,
            </div>
            
            <p>Your room booking has been <strong>successfully confirmed</strong>! We're excited to host you. 🏡</p>
            
            <div class="booking-card">
                <h3 class="booking-title">📋 Booking Details</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">🏕️ Room:</span>
                        <span class="detail-value">${bookingData?.title || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📍 Category:</span>
                        <span class="detail-value">${bookingData?.category || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📅 Check-in:</span>
                        <span class="detail-value">${bookingData?.from ? new Date(bookingData.from).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📅 Check-out:</span>
                        <span class="detail-value">${bookingData?.to ? new Date(bookingData.to).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">💰 Total Amount:</span>
                        <span class="detail-value">$${bookingData?.price || '0'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">🧍 Guests:</span>
                        <span class="detail-value">${bookingData?.guests || '0'}</span>
                    </div>
                </div>
            </div>

            <div class="host-info">
                <h4>👤 Host Information</h4>
                <p><strong>${bookingData?.host?.name || 'N/A'}</strong></p>
                <p>📧 ${bookingData?.host?.email || 'N/A'}</p>
            </div>

            <div class="transaction-id">
                🔒 Transaction ID: ${bookingData?.transactionId || 'N/A'}
            </div>

            <p>Thank you for choosing <strong>StayNest</strong>! We're looking forward to providing you with a wonderful experience. 🌿</p>
        </div>
        
        <div class="email-footer">
            <p>— The StayNest Team —</p>
            <p style="margin-top: 8px; font-size: 12px;">Need help? Contact us at support@staynest.com</p>
        </div>
    </div>
</body>
</html>
  `;
};

const getHostBookingTemplate = (bookingData) => {
    // Ensure bookingData exists
    if (!bookingData) return '<p>Booking data not available</p>';

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking Notification</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; padding: 20px; }
        .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .email-header { background: linear-gradient(135deg, #e67e22 0%, #2c3e50 100%); color: white; padding: 30px; text-align: center; }
        .email-header h1 { font-size: 28px; font-weight: 600; margin-bottom: 10px; }
        .email-body { padding: 30px; }
        .greeting { font-size: 18px; color: #2c3e50; margin-bottom: 20px; }
        .booking-card { background: #f8f9fa; border-radius: 12px; padding: 25px; margin: 20px 0; border-left: 4px solid #e67e22; }
        .booking-title { color: #e67e22; font-size: 20px; margin-bottom: 15px; font-weight: 600; }
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .detail-item { margin-bottom: 8px; }
        .detail-label { font-weight: 600; color: #2c3e50; }
        .detail-value { color: #5a6c7d; }
        .guest-info { background: white; border: 1px solid #eaeaea; border-radius: 12px; padding: 20px; margin: 20px 0; }
        .action-note { background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #27ae60; }
        .email-footer { text-align: center; color: #7f8c8d; font-size: 14px; padding: 20px; border-top: 1px solid #eaeaea; margin-top: 20px; }
        .emoji { font-size: 18px; margin-right: 5px; }
        @media (max-width: 480px) {
            .detail-grid { grid-template-columns: 1fr; }
            .email-body { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>🏡 New Booking Received!</h1>
            <p>Congratulations on your new booking</p>
        </div>
        
        <div class="email-body">
            <div class="greeting">
                Hi <strong>${bookingData?.host?.name || 'Host'}</strong>,
            </div>
            
            <p>Great news! You have a new booking for your room "<strong>${bookingData?.title || 'N/A'}</strong>". 🎉</p>
            
            <div class="guest-info">
                <h4>👤 Guest Information</h4>
                <p><strong>${bookingData?.guest?.name || 'N/A'}</strong></p>
                <p>📧 ${bookingData?.guest?.email || 'N/A'}</p>
            </div>

            <div class="booking-card">
                <h3 class="booking-title">📋 Booking Details</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">🏕️ Room:</span>
                        <span class="detail-value">${bookingData?.title || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📍 Category:</span>
                        <span class="detail-value">${bookingData?.category || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📅 Check-in:</span>
                        <span class="detail-value">${bookingData?.from ? new Date(bookingData.from).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">📅 Check-out:</span>
                        <span class="detail-value">${bookingData?.to ? new Date(bookingData.to).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">💰 Total Earnings:</span>
                        <span class="detail-value">$${bookingData?.price || '0'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">🧍 Guests:</span>
                        <span class="detail-value">${bookingData?.guests || '0'}</span>
                    </div>
                </div>
            </div>

            <div class="action-note">
                <h4>📝 Next Steps</h4>
                <p>Please ensure your room is prepared and clean before the guest's arrival. Contact the guest if you need to coordinate check-in details.</p>
            </div>

            <p>We're excited to see you provide an excellent hosting experience! 🌟</p>
        </div>
        
        <div class="email-footer">
            <p>— The StayNest Team —</p>
            <p style="margin-top: 8px; font-size: 12px;">Host support: hosts@staynest.com</p>
        </div>
    </div>
</body>
</html>
  `;
};

// Export the template functions
module.exports = {
    getGuestBookingTemplate,
    getHostBookingTemplate
};