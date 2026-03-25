-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "origin" TEXT,
ADD COLUMN     "pieces" INTEGER,
ALTER COLUMN "weight" SET DATA TYPE TEXT;
