import prisma from "../lib/prisma.js"
import bcrypt from "bcryptjs"

// Функция для генерации истории отслеживания заказа
function generateTrackingHistory(finalStatus) {
  const statuses = [
    { status: "ORDER_RECEIVED", days: 0 },
    { status: "IN_TRANSIT", days: 2 },
    { status: "ON_SORTING_CENTER", days: 4 },
    { status: "ON_THE_WAY", days: 6 },
    { status: "DELIVERED", days: 8 }
  ]

  const baseDate = new Date('2024-05-26')
  const trackings = []

  for (const statusData of statuses) {
    if (statusData.status === finalStatus || statusData.days <= getTrackingDays(finalStatus)) {
      trackings.push({
        status: statusData.status,
        date: new Date(baseDate.getTime() + statusData.days * 24 * 60 * 60 * 1000),
        location: getLocationForStatus(statusData.status),
        notes: getNotesForStatus(statusData.status),
      })
    }
  }

  return trackings
}

function getTrackingDays(status) {
  const daysMap = {
    "ORDER_RECEIVED": 0,
    "IN_TRANSIT": 2,
    "ON_SORTING_CENTER": 4,
    "ON_THE_WAY": 6,
    "DELIVERED": 8
  }
  return daysMap[status] || 0
}

function getLocationForStatus(status) {
  const locations = {
    "ORDER_RECEIVED": "Distribution Center NYC",
    "IN_TRANSIT": "On Route to CA",
    "ON_SORTING_CENTER": "Sorting Center LA",
    "ON_THE_WAY": "Local Delivery Team",
    "DELIVERED": "Final Destination"
  }
  return locations[status]
}

function getNotesForStatus(status) {
  const notes = {
    "ORDER_RECEIVED": "Order confirmed and packed",
    "IN_TRANSIT": "Package is in transit",
    "ON_SORTING_CENTER": "Package arrived at sorting center",
    "ON_THE_WAY": "Out for delivery",
    "DELIVERED": "Package delivered successfully"
  }
  return notes[status]
}

async function main() {
  // Очистка таблиц
  await prisma.orderTracking.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.rating.deleteMany()
  await prisma.product.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.store.deleteMany()
  await prisma.address.deleteMany()
  await prisma.user.deleteMany()
  await prisma.coupon.deleteMany()

  // Rolex
  await prisma.brand.create({
    data: {
      name: "Rolex",
      slug: "rolex",
      description: "Swiss luxury watch manufacturer",
      logo: "/assets/watchBrands/rolex.png",
      products: {
        create: [
          {
            name: "Rolex Submariner",
            description: "Iconic dive watch with ceramic bezel and automatic movement",
            mrp: 12000,
            price: 9990,
            images: ["/assets/product_img1.png"],
            category: "luxury",
            stock: 5,
            spec: {
              collection: "Submariner",
              mechanism: "Automatic",
              gender: "Unisex",
              caseSize: "40mm",
              caseMaterial: "Stainless Steel",
              strapMaterial: "Oystersteel",
              waterResistance: "300m",
            },
          },
          {
            name: "Rolex Daytona",
            description: "Legendary chronograph designed for racing",
            mrp: 15000,
            price: 13990,
            images: ["/assets/product_img5.png"],
            category: "luxury",
            stock: 3,
            spec: {
              collection: "Daytona",
              mechanism: "Automatic",
              gender: "Men",
              caseSize: "40mm",
              caseMaterial: "Stainless Steel",
              strapMaterial: "Oysterflex",
              waterResistance: "100m",
            },
          },
        ],
      },
    },
  })

  // Omega
  await prisma.brand.create({
    data: {
      name: "Omega",
      slug: "omega",
      description: "Swiss luxury watchmaker",
      logo: "/assets/watchBrands/omega.png",
      products: {
        create: [
          {
            name: "Omega Speedmaster",
            description: "Moonwatch chronograph with manual winding movement",
            mrp: 8000,
            price: 7290,
            images: ["/assets/product_img2.png"],
            category: "luxury",
            stock: 8,
            spec: {
              collection: "Speedmaster",
              mechanism: "Manual Winding",
              gender: "Men",
              caseSize: "42mm",
              caseMaterial: "Stainless Steel",
              strapMaterial: "Leather",
              waterResistance: "50m",
            },
          },
          {
            name: "Omega Seamaster",
            description: "Diver’s watch with co-axial escapement",
            mrp: 7500,
            price: 6890,
            images: ["/assets/product_img6.png"],
            category: "luxury",
            stock: 6,
            spec: {
              collection: "Seamaster",
              mechanism: "Automatic",
              gender: "Unisex",
              caseSize: "41mm",
              caseMaterial: "Stainless Steel",
              strapMaterial: "Rubber",
              waterResistance: "300m",
            },
          },
        ],
      },
    },
  })

  // Seiko
  await prisma.brand.create({
    data: {
      name: "Seiko",
      slug: "seiko",
      description: "Japanese watch manufacturer",
      logo: "/assets/watchBrands/seiko.png",
      products: {
        create: [
          {
            name: "Seiko 5 Sports",
            description: "Automatic everyday watch with day-date function",
            mrp: 350,
            price: 299,
            images: ["/assets/product_img3.png"],
            category: "mid-range",
            stock: 15,
            spec: {
              collection: "5 Sports",
              mechanism: "Automatic",
              gender: "Men",
              caseSize: "42.5mm",
              caseMaterial: "Stainless Steel",
              strapMaterial: "Fabric",
              waterResistance: "100m",
            },
          },
          {
            name: "Seiko Prospex Diver",
            description: "Professional diver’s watch with ISO certification",
            mrp: 600,
            price: 499,
            images: ["/assets/product_img7.png"],
            category: "mid-range",
            stock: 12,
            spec: {
              collection: "Prospex",
              mechanism: "Automatic",
              gender: "Unisex",
              caseSize: "44mm",
              caseMaterial: "Stainless Steel",
              strapMaterial: "Silicone",
              waterResistance: "200m",
            },
          },
        ],
      },
    },
  })

  // Casio
  await prisma.brand.create({
    data: {
      name: "Casio",
      slug: "casio",
      description: "Japanese electronics and watch company",
      logo: "/assets/watchBrands/casio.png",
      products: {
        create: [
          {
            name: "Casio G-Shock",
            description: "Rugged digital watch with multiple functions",
            mrp: 150,
            price: 129,
            images: ["/assets/product_img4.png"],
            category: "budget",
            stock: 25,
            spec: {
              collection: "G-Shock",
              mechanism: "Quartz",
              gender: "Unisex",
              caseSize: "48.9mm",
              caseMaterial: "Resin",
              strapMaterial: "Resin",
              waterResistance: "200m",
            },
          },
          {
            name: "Casio Edifice",
            description: "Stylish chronograph with sporty design",
            mrp: 200,
            price: 179,
            images: ["/assets/product_img8.png"],
            category: "budget",
            stock: 18,
            spec: {
              collection: "Edifice",
              mechanism: "Quartz",
              gender: "Men",
              caseSize: "44mm",
              caseMaterial: "Stainless Steel",
              strapMaterial: "Leather",
              waterResistance: "100m",
            },
          },
        ],
      },
    },
  })

  // Создаём админа
  const adminPassword = await bcrypt.hash("password123", 10)
  await prisma.user.create({
    data: {
      id: "admin_1",
      name: "Super Admin",
      email: "admin@store.test",
      image: "",
      password: adminPassword,
      role: "admin",
      isMember: true,
    },
  })

  // Создаём владельца магазина
  const ownerPassword = await bcrypt.hash("password123", 10)
  await prisma.user.create({
    data: {
      id: "owner_1",
      name: "Watch Seller",
      email: "owner@example.com",
      image: "",
      password: ownerPassword,
      role: "user",
      isMember: true,
    },
  })

  // Тестовые пользователи
  const testUsers = []
  const userPassword = await bcrypt.hash("password123", 10)

  for (let i = 1; i <= 20; i++) {
    const isMember = i <= 10
    testUsers.push({
      id: `user_${i}`,
      name: `Test User ${i}`,
      email: `user${i}@test.com`,
      image: "",
      password: userPassword,
      role: "user",
      isMember,
    })
  }

  await prisma.user.createMany({ data: testUsers })

  // Создаём магазин
  await prisma.store.create({
    data: {
      userId: "owner_1",
      name: "Luxury Watch Store",
      description: "Premium watches from top brands",
      username: "luxury_watches",
      address: "123 Watch Street, Geneva, Switzerland",
      status: "approved",
      isActive: true,
      logo: "/assets/gs_logo.jpg",
      email: "contact@luxurywatches.com",
      contact: "+41 22 901 1000",
    },
  })

  // Создаём адреса для пользователей
  const address1 = await prisma.address.create({
    data: {
      id: "addr_1",
      userId: "user_1",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      street: "456 Maple Avenue",
      city: "Brooklyn",
      state: "NY",
      zip: "11201",
      country: "United States",
      phone: "+1 (555) 123-4567",
    },
  })

  const address2 = await prisma.address.create({
    data: {
      id: "addr_2",
      userId: "user_2",
      name: "Michael Johnson",
      email: "michael.j@email.com",
      street: "789 Oak Street",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
      phone: "+1 (555) 987-6543",
    },
  })

  // Создаём купоны
  await prisma.coupon.create({
    data: {
      code: "WELCOME10",
      description: "10% off for new customers",
      discount: 10,
      forNewUser: true,
      forMember: false,
      isPublic: true,
      expiresAt: new Date('2025-12-31'),
    },
  })

  await prisma.coupon.create({
    data: {
      code: "MEMBERS20",
      description: "20% off for premium members",
      discount: 20,
      forNewUser: false,
      forMember: true,
      isPublic: false,
      expiresAt: new Date('2025-12-31'),
    },
  })

  // Получаем продукты и магазин для создания заказов
  const products = await prisma.product.findMany()
  const store = await prisma.store.findFirst()

  // Создаём 5 образцовых заказов с разными статусами
  const ordersData = [
    {
      id: "order_1",
      orderNumber: "521459",
      total: 369.00,
      status: "DELIVERED",
      trackingStatus: "DELIVERED",
      userId: "user_1",
      storeId: store.id,
      addressId: "addr_1",
      isPaid: true,
      paymentMethod: "STRIPE",
      pickupDate: new Date('2024-05-26T12:24:10'),
      estimatedDrop: "8 Days",
      returnAvailableTime: "In 7 Days",
    },
    {
      id: "order_2",
      orderNumber: "521461",
      total: 7299,
      status: "IN_TRANSIT",
      trackingStatus: "IN_TRANSIT",
      userId: "user_2",
      storeId: store.id,
      addressId: "addr_2",
      isPaid: true,
      paymentMethod: "STRIPE",
      pickupDate: new Date('2024-05-28T10:15:30'),
      estimatedDrop: "12 Days",
      returnAvailableTime: "In 10 Days",
    },
    {
      id: "order_3",
      orderNumber: "521462",
      total: 1499,
      status: "ON_SORTING_CENTER",
      trackingStatus: "ON_SORTING_CENTER",
      userId: "user_3",
      storeId: store.id,
      addressId: "addr_1",
      isPaid: false,
      paymentMethod: "COD",
      pickupDate: new Date('2024-05-30T14:20:15'),
      estimatedDrop: "6 Days",
      returnAvailableTime: "In 5 Days",
    },
    {
      id: "order_4",
      orderNumber: "521463",
      total: 9991,
      status: "ON_THE_WAY",
      trackingStatus: "ON_THE_WAY",
      userId: "user_4",
      storeId: store.id,
      addressId: "addr_2",
      isPaid: true,
      paymentMethod: "PAYPAL",
      pickupDate: new Date('2024-06-02T09:45:22'),
      estimatedDrop: "15 Days",
      returnAvailableTime: "In 12 Days",
    },
    {
      id: "order_5",
      orderNumber: "521464",
      total: 299,
      status: "ORDER_PLACED",
      trackingStatus: "ORDER_RECEIVED",
      userId: "user_5",
      storeId: store.id,
      addressId: "addr_1",
      isPaid: false,
      paymentMethod: "COD",
      estimatedDrop: "4 Days",
      returnAvailableTime: "In 3 Days",
    },
  ]

  // Создаём заказы
  for (const orderData of ordersData) {
    const order = await prisma.order.create({
      data: {
        ...orderData,
        orderItems: {
          create: [
            {
              productId: products[0].id,
              quantity: 1,
              price: products[0].price,
            },
            {
              productId: products[1].id,
              quantity: 2,
              price: products[1].price,
            },
          ],
        },
        trackingUpdates: {
          create: generateTrackingHistory(orderData.trackingStatus),
        },
      },
    })
  }

  console.log("✅ Seed completed successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
