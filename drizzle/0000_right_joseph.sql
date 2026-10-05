CREATE TYPE "public"."payment_method" AS ENUM('CASH', 'QRIS');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('kasir', 'admin');--> statement-breakpoint
CREATE TABLE "categories" (
	"id_categories" varchar(20) PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id_customers" varchar(10) PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"phone" varchar(12),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id_items" varchar(20) PRIMARY KEY NOT NULL,
	"id_order" varchar(20),
	"quantity" integer,
	"price" numeric(10, 0),
	"subtotal" numeric(10, 0),
	"created_at" timestamp DEFAULT now(),
	"id_products" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id_order" varchar(20) PRIMARY KEY NOT NULL,
	"table_number" integer,
	"id_customer" varchar(20),
	"id_user" varchar(20),
	"status" varchar(20),
	"total_amount" numeric(10, 0),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id_pay" varchar(20) PRIMARY KEY NOT NULL,
	"id_order" varchar(20),
	"method" "payment_method",
	"status" varchar(100),
	"proof_url" varchar(225),
	"verified_by" varchar(100),
	"verified_at" time,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id_products" varchar(20) PRIMARY KEY NOT NULL,
	"id_category" varchar(20),
	"name" varchar(20),
	"description" text,
	"price" numeric(10, 0),
	"image_url" varchar(255),
	"stock" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id_user" varchar(20) PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"email" varchar(100),
	"password" varchar(12),
	"role" "user_role",
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_id_order_orders_id_order_fk" FOREIGN KEY ("id_order") REFERENCES "public"."orders"("id_order") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_id_products_products_id_products_fk" FOREIGN KEY ("id_products") REFERENCES "public"."products"("id_products") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_customer_customers_id_customers_fk" FOREIGN KEY ("id_customer") REFERENCES "public"."customers"("id_customers") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_user_users_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id_user") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_id_order_orders_id_order_fk" FOREIGN KEY ("id_order") REFERENCES "public"."orders"("id_order") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_id_category_categories_id_categories_fk" FOREIGN KEY ("id_category") REFERENCES "public"."categories"("id_categories") ON DELETE no action ON UPDATE no action;