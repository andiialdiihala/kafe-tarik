import {
  pgTable,
  varchar,
  integer,
  decimal,
  timestamp,
  text,
  pgEnum,
  time,
  boolean,
} from "drizzle-orm/pg-core";

/* =====================================================
   ENUMS
===================================================== */

export const userRoleEnum = pgEnum("user_role", [
  "kasir",
  "admin",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "CASH",
  "QRIS",
]);

/* =====================================================
   BETTER AUTH TABLES
===================================================== */

export const user = pgTable("user", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: varchar("image", { length: 255 }),
  role: userRoleEnum("role").default("kasir"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: varchar("id", { length: 36 }).primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: varchar("ip_address", { length: 255 }),
  userAgent: text("user_agent"),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: varchar("id", { length: 36 }).primaryKey(),
  accountId: varchar("account_id", { length: 255 }).notNull(),
  providerId: varchar("provider_id", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: varchar("scope", { length: 255 }),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: varchar("id", { length: 36 }).primaryKey(),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const invitations = pgTable("invitations", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  role: userRoleEnum("role").default("kasir"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/* =====================================================
   CUSTOMERS
===================================================== */

export const customers = pgTable("customers", {
  idCustomers: varchar("id_customers", {
    length: 10,
  }).primaryKey(),

  name: varchar("name", {
    length: 100,
  }),

  phone: varchar("phone", {
    length: 12,
  }),

  createdAt: timestamp("created_at")
    .defaultNow(),
});

/* =====================================================
   USERS
===================================================== */

export const users = pgTable("users", {
  idUser: varchar("id_user", {
    length: 20,
  }).primaryKey(),

  name: varchar("name", {
    length: 100,
  }),

  email: varchar("email", {
    length: 100,
  }),

  password: varchar("password", {
    length: 12,
  }),

  role: userRoleEnum("role"),

  createdAt: timestamp("created_at")
    .defaultNow(),
});

/* =====================================================
   CATEGORIES
===================================================== */

export const categories = pgTable("categories", {
  idCategories: varchar("id_categories", {
    length: 20,
  }).primaryKey(),

  name: varchar("name", {
    length: 100,
  }),

  icon: varchar("icon", {
    length: 255,
  }),

  createdAt: timestamp("created_at")
    .defaultNow(),
});

/* =====================================================
   PRODUCTS
===================================================== */

export const products = pgTable("products", {
  idProducts: varchar("id_products", {
    length: 20,
  }).primaryKey(),

  idCategory: varchar("id_category", {
    length: 20,
  }).references(() => categories.idCategories),

  name: varchar("name", {
    length: 100,
  }),

  description: text("description"),

  price: decimal("price", {
    precision: 10,
    scale: 0,
  }),

  imageUrl: varchar("image_url", {
    length: 255,
  }),

  stock: integer("stock"),

  createdAt: timestamp("created_at")
    .defaultNow(),
});

/* =====================================================
   ORDERS
===================================================== */

export const orders = pgTable("orders", {
  idOrder: varchar("id_order", {
    length: 20,
  }).primaryKey(),

  tableNumber: integer("table_number"),

  idCustomer: varchar("id_customer", {
    length: 20,
  }).references(() => customers.idCustomers),

  idUser: varchar("id_user", {
    length: 20,
  }).references(() => users.idUser),

  status: varchar("status", {
    length: 20,
  }),

  totalAmount: decimal("total_amount", {
    precision: 10,
    scale: 0,
  }),

  createdAt: timestamp("created_at")
    .defaultNow(),
});

/* =====================================================
   ORDER ITEMS
===================================================== */

export const orderItems = pgTable("order_items", {
  idItems: varchar("id_items", {
    length: 20,
  }).primaryKey(),

  idOrder: varchar("id_order", {
    length: 20,
  }).references(() => orders.idOrder),

  quantity: integer("quantity"),

  price: decimal("price", {
    precision: 10,
    scale: 0,
  }),

  subtotal: decimal("subtotal", {
    precision: 10,
    scale: 0,
  }),

  createdAt: timestamp("created_at")
    .defaultNow(),

  idProducts: varchar("id_products", {
    length: 20,
  }).references(() => products.idProducts),
});

/* =====================================================
   PAYMENTS
===================================================== */

export const payments = pgTable("payments", {
  idPay: varchar("id_pay", {
    length: 20,
  }).primaryKey(),

  idOrder: varchar("id_order", {
    length: 20,
  }).references(() => orders.idOrder),

  method: paymentMethodEnum("method"),

  status: varchar("status", {
    length: 100,
  }),

  proofUrl: varchar("proof_url", {
    length: 225,
  }),

  verifiedBy: varchar("verified_by", {
    length: 100,
  }),

  verifiedAt: time("verified_at"),

  createdAt: timestamp("created_at")
    .defaultNow(),
});
