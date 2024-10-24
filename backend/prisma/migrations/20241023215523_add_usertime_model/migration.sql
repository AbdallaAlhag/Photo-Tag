/*
  Warnings:

  - Added the required column `map` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MapType" AS ENUM ('MAP1', 'MAP2', 'MAP3');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "map" "MapType" NOT NULL;
