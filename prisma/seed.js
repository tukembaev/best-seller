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

// Функция для генерации случайного рейтинга от 4.0 до 5.0
function generateRandomRating() {
  return Math.round((Math.random() * 1 + 4) * 10) / 10 // От 4.0 до 5.0 с шагом 0.1
}

async function main() {
  // Очистка таблиц в правильном порядке
  await prisma.orderTracking.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.saleItem.deleteMany()
  await prisma.sale.deleteMany()
  await prisma.order.deleteMany()
  await prisma.rating.deleteMany()
  await prisma.productTemplate.deleteMany()
  await prisma.product.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.store.deleteMany()
  await prisma.address.deleteMany()
  await prisma.user.deleteMany()
  await prisma.coupon.deleteMany()

  console.log("🧹 Database cleaned")

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
            video: "/IMG_6581.MP4",
            category: "luxury",
            stock: 5,
            rating: generateRandomRating(),
            collection: "Submariner",
            mechanism: "Automatic",
            gender: "Unisex",
            caseSize: "40mm",
            caseMaterial: "Stainless Steel",
            strapMaterial: "Oystersteel",
            waterResistance: "300m",
          },
          {
            name: "Rolex Daytona",
            description: "Legendary chronograph designed for racing",
            mrp: 15000,
            price: 13990,
            images: ["/assets/product_img5.png"],
            video: "/IMG_6581.MP4",
            category: "luxury",
            stock: 3,
            rating: generateRandomRating(),
            collection: "Daytona",
            mechanism: "Automatic",
            gender: "Men",
            caseSize: "40mm",
            caseMaterial: "Stainless Steel",
            strapMaterial: "Oysterflex",
            waterResistance: "100m",
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
            video: "/IMG_6581.MP4",
            category: "luxury",
            stock: 8,
            rating: generateRandomRating(),
            collection: "Speedmaster",
            mechanism: "Manual Winding",
            gender: "Men",
            caseSize: "42mm",
            caseMaterial: "Stainless Steel",
            strapMaterial: "Leather",
            waterResistance: "50m",
          },
          {
            name: "Omega Seamaster",
            description: "Diver's watch with co-axial escapement",
            mrp: 7500,
            price: 6890,
            images: ["/assets/product_img6.png"],
            video: "/IMG_6581.MP4",
            category: "luxury",
            stock: 6,
            rating: generateRandomRating(),
            collection: "Seamaster",
            mechanism: "Automatic",
            gender: "Unisex",
            caseSize: "41mm",
            caseMaterial: "Stainless Steel",
            strapMaterial: "Rubber",
            waterResistance: "300m",
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
            video: "/IMG_6581.MP4",
            category: "mid-range",
            stock: 15,
            rating: generateRandomRating(),
            collection: "5 Sports",
            mechanism: "Automatic",
            gender: "Men",
            caseSize: "42.5mm",
            caseMaterial: "Stainless Steel",
            strapMaterial: "Fabric",
            waterResistance: "100m",
          },
          {
            name: "Seiko Prospex Diver",
            description: "Professional diver's watch with ISO certification",
            mrp: 600,
            price: 499,
            images: ["/assets/product_img7.png"],
            video: "/IMG_6581.MP4",
            category: "mid-range",
            stock: 12,
            rating: generateRandomRating(),
            collection: "Prospex",
            mechanism: "Automatic",
            gender: "Unisex",
            caseSize: "44mm",
            caseMaterial: "Stainless Steel",
            strapMaterial: "Silicone",
            waterResistance: "200m",
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
            video: "/IMG_6581.MP4",
            category: "budget",
            stock: 25,
            rating: generateRandomRating(),
            collection: "G-Shock",
            mechanism: "Quartz",
            gender: "Unisex",
            caseSize: "48.9mm",
            caseMaterial: "Resin",
            strapMaterial: "Resin",
            waterResistance: "200m",
          },
          {
            name: "Casio Edifice",
            description: "Stylish chronograph with sporty design",
            mrp: 200,
            price: 179,
            images: ["/assets/product_img8.png"],
            video: "/IMG_6581.MP4",
            category: "budget",
            stock: 18,
            rating: generateRandomRating(),
            collection: "Edifice",
            mechanism: "Quartz",
            gender: "Men",
            caseSize: "44mm",
            caseMaterial: "Stainless Steel",
            strapMaterial: "Leather",
            waterResistance: "100m",
          },
        ],
      },
    },
  })

  console.log("✅ Brands and products created")

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

  // Создаём продавцов (sellers)
  const sellerPassword = await bcrypt.hash("password123", 10)
  const sellers = []
  
  for (let i = 1; i <= 5; i++) {
    sellers.push({
      id: `seller_${i}`,
      name: `Seller ${i}`,
      email: `seller${i}@store.com`,
      image: "",
      password: sellerPassword,
      role: "seller",
      isMember: true,
    })
  }
  
  await prisma.user.createMany({ data: sellers })

  console.log("✅ Users and sellers created")

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
  const addresses = []
  for (let i = 1; i <= 10; i++) {
    addresses.push(await prisma.address.create({
      data: {
        userId: `user_${i}`,
        name: `User ${i} Address`,
        email: `user${i}@test.com`,
        street: `${i * 100} Main Street`,
        city: i % 2 === 0 ? "New York" : "Los Angeles",
        state: i % 2 === 0 ? "NY" : "CA",
        zip: `${10000 + i}`,
        country: "United States",
        phone: `+1 (555) ${100 + i}-${1000 + i}`,
      },
    }))
  }

  console.log("✅ Addresses created")

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

  console.log("✅ Coupons created")

  // Получаем продукты для создания заказов
  const products = await prisma.product.findMany()

  // Создаём заказы с разными статусами
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const twoDaysAgo = new Date(today)
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
  const threeDaysAgo = new Date(today)
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

  // 3 непринятых заказа (без sellerId)
  for (let i = 1; i <= 3; i++) {
    await prisma.order.create({
      data: {
        orderNumber: `ORD${100000 + i}`,
        total: products[i % products.length].price * (i + 1),
        status: "ORDER_PLACED",
        trackingStatus: "ORDER_RECEIVED",
        userId: `user_${i}`,
        addressId: addresses[i - 1].id,
        isPaid: false,
        paymentMethod: "COD",
        estimatedDrop: "3-5 Days",
        createdAt: twoDaysAgo,
        orderItems: {
          create: [
            {
              productId: products[i % products.length].id,
              quantity: i + 1,
              price: products[i % products.length].price,
            },
          ],
        },
        trackingUpdates: {
          create: [
            {
              status: "ORDER_RECEIVED",
              date: twoDaysAgo,
              location: "Order Processing Center",
              notes: "Order received and being processed",
            },
          ],
        },
      },
    })
  }

  console.log("✅ Unassigned orders created")

  // Заказы, принятые продавцами (с sellerId)
  for (let i = 1; i <= 5; i++) {
    const sellerId = `seller_${(i % 5) + 1}`
    const statuses = ["PROCESSING", "IN_TRANSIT", "ON_THE_WAY", "DELIVERED", "PROCESSING"]
    const trackingStatuses = ["ORDER_RECEIVED", "IN_TRANSIT", "ON_THE_WAY", "DELIVERED", "ORDER_RECEIVED"]

    await prisma.order.create({
      data: {
        orderNumber: `ORD${200000 + i}`,
        total: products[(i + 3) % products.length].price * (i + 2),
        status: statuses[i - 1],
        trackingStatus: trackingStatuses[i - 1],
        userId: `user_${i + 3}`,
        sellerId: sellerId,
        addressId: addresses[(i + 2) % addresses.length].id,
        isPaid: i % 2 === 0,
        paymentMethod: i % 2 === 0 ? "STRIPE" : "COD",
        estimatedDrop: "5-7 Days",
        createdAt: i === 4 ? yesterday : threeDaysAgo,
        orderItems: {
          create: [
            {
              productId: products[(i + 3) % products.length].id,
              quantity: i + 2,
              price: products[(i + 3) % products.length].price,
            },
          ],
        },
        trackingUpdates: {
          create: generateTrackingHistory(trackingStatuses[i - 1]),
        },
      },
    })
  }

  console.log("✅ Seller orders created")

  // Создаём продажи от продавцов (витрина)
  for (let i = 1; i <= 10; i++) {
    const sellerId = `seller_${(i % 5) + 1}`
    const product1 = products[i % products.length]
    const product2 = products[(i + 1) % products.length]
    
    const items = [
      {
        productId: product1.id,
        quantity: Math.floor(Math.random() * 3) + 1,
        price: product1.price,
      },
    ]

    // Иногда добавляем второй товар
    if (i % 3 === 0) {
      items.push({
        productId: product2.id,
        quantity: Math.floor(Math.random() * 2) + 1,
        price: product2.price,
      })
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    const saleDate = new Date(today)
    saleDate.setDate(saleDate.getDate() - Math.floor(Math.random() * 7))

    await prisma.sale.create({
      data: {
        sellerId: sellerId,
        total: total,
        createdAt: saleDate,
        saleItems: {
          create: items,
        },
      },
    })
  }

  console.log("✅ Sales created")

  // Создаём рейтинги для доставленных заказов
  const deliveredOrders = await prisma.order.findMany({
    where: { status: "DELIVERED" },
    include: { orderItems: true }
  })

  for (const order of deliveredOrders) {
    for (const item of order.orderItems) {
      await prisma.rating.create({
        data: {
          rating: Math.floor(Math.random() * 2) + 4, // 4 или 5 звезд
          review: "Great product! Highly recommend.",
          userId: order.userId,
          productId: item.productId,
          orderId: order.id,
        },
      })
    }
  }

  console.log("✅ Ratings created")

  console.log("\n🎉 Seed completed successfully!")
  console.log("\n📊 Summary:")
  console.log("- Products: 8")
  console.log("- Brands: 4")
  console.log("- Users: 26 (1 admin, 1 owner, 5 sellers, 20 customers)")
  console.log("- Unassigned Orders: 3")
  console.log("- Seller Orders: 5")
  console.log("- Sales (витрина): 10")
  console.log("\n🔐 Login credentials:")
  console.log("Seller: seller1@store.com / password123")
  console.log("Seller: seller2@store.com / password123")
  console.log("Admin: admin@store.test / password123")
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
