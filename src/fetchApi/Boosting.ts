const API_URL = `${process.env.NEXT_PUBLIC_MORETHANPANEL_BASE_URL}`;
const API_KEY = `${process.env.NEXT_PUBLIC_MORETHANPANEL_API_KEY}`;

// Helper function for all API calls
async function apiCall(params:any) {
  const body = new URLSearchParams({ key: API_KEY, ...params });
console.log('the body', body.toString())
console.log('the url', API_URL)

  const response = await fetch(API_URL, {
    method: "POST",
    next: { revalidate: 1800 },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  return response.json();
}

// 1. Get all available services
export async function getServices() {
  return await apiCall({ action: "services" });
}

// 2. Place an order
async function addOrder(serviceId:any, link:any, quantity:any) {
  return await apiCall({
    action: "add",
    service: serviceId,
    link: link,
    quantity: quantity,
  });
}

// 3. Check order status
async function getOrderStatus(orderId:any) {
  return await apiCall({ action: "status", order: orderId });
}

// 4. Check balance
async function getBalance() {
  return await apiCall({ action: "balance" });
}

// 5. Cancel orders
async function cancelOrders(orderIds:any) {
  // orderIds = array like [1, 2, 3]
  return await apiCall({ action: "cancel", orders: orderIds.join(",") });
}

// 6. Request refill
async function refillOrder(orderId:any) {
  return await apiCall({ action: "refill", order: orderId });
}

// --- Usage Example ---
// (async () => {
//   const balance = await getBalance();
//   console.log("Balance:", balance); // { balance: "100.84", currency: "USD" }

//   const services = await getServices();
//   console.log("First service:", services[0]);

//   const order = await addOrder(1, "https://instagram.com/yourpage", 500);
//   console.log("Order placed:", order); // { order: 23501 }

//   const status = await getOrderStatus(order.order);
//   console.log("Order status:", status);
// })();