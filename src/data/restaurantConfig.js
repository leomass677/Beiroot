export const restaurantConfig = {
  whatsappNumber: "+2348034567890",
  bankDetails: {
    accountName: "Beiroot Foods",
    accountNumber: "1234567890",
    bankName: "Access Bank",
  },
  orderInstructions: [
    "1. Select your items from the menu below",
    "2. Click 'Order via WhatsApp' to start your order",
    "3. Make payment to the bank account above",
    "4. Send your proof of payment via WhatsApp",
    "5. Wait for confirmation and delivery (30-45 mins)",
  ],
  deliveryFee: 1500,
  minimumOrder: 3000,
  processingTime: "30-45 minutes",
  paymentMethods: ["Bank Transfer", "Pay on Delivery"],
};

// Helper function to generate WhatsApp order message
export const generateOrderMessage = (items, total, customerDetails) => {
  let message = "*BEIROOT ORDER*\\n\\n";
  message += "*Items Ordered:*\\n";

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}`;
    if (item.size) message += ` (${item.size})`;
    if (item.quantity > 1) message += ` x${item.quantity}`;
    message += ` - ₦${item.price.toLocaleString()}\\n`;

    if (item.customizations && item.customizations.length > 0) {
      message += `   Customizations: ${item.customizations.join(", ")}\\n`;
    }
  });

  message += `\\n*Subtotal:* ₦${total.subtotal.toLocaleString()}`;
  message += `\\n*Delivery Fee:* ₦${total.deliveryFee.toLocaleString()}`;
  message += `\\n*Total:* ₦${total.total.toLocaleString()}`;

  message += `\\n\\n*Payment Method:* Bank Transfer`;
  message += `\\n*Bank:* ${restaurantConfig.bankDetails.bankName}`;
  message += `\\n*Account Name:* ${restaurantConfig.bankDetails.accountName}`;
  message += `\\n*Account Number:* ${restaurantConfig.bankDetails.accountNumber}`;

  message += `\\n\\n*Customer Details:*`;
  message += `\\nName: ${customerDetails.name}`;
  message += `\\nPhone: ${customerDetails.phone}`;
  message += `\\nAddress: ${customerDetails.address}`;

  if (customerDetails.notes) {
    message += `\\n\\n*Additional Notes:* ${customerDetails.notes}`;
  }

  return encodeURIComponent(message);
};
