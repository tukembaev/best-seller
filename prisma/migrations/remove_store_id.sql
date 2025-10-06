-- Remove storeId column from Order table
-- This migration removes the storeId field since we only have one store

-- First, drop the foreign key constraint
ALTER TABLE "Order" DROP CONSTRAINT IF EXISTS "Order_storeId_fkey";

-- Then drop the column
ALTER TABLE "Order" DROP COLUMN IF EXISTS "storeId";
