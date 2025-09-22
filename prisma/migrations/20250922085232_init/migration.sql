/*
  Warnings:

  - The values [confirmed] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `endTime` on the `AvailabilitySlot` table. All the data in the column will be lost.
  - You are about to drop the column `locationDetails` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `locationType` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `address` to the `AvailabilitySlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `AvailabilitySlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationMins` to the `AvailabilitySlot` table without a default value. This is not possible if the table is not empty.
  - Made the column `availabilitySlotId` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `title` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('completed', 'on_going');

-- CreateEnum
CREATE TYPE "public"."SkillLevel" AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');

-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('booking', 'verification', 'system', 'reminder');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."BookingStatus_new" AS ENUM ('pending', 'accepted', 'rejected', 'cancelled', 'completed');
ALTER TABLE "public"."Booking" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Booking" ALTER COLUMN "status" TYPE "public"."BookingStatus_new" USING ("status"::text::"public"."BookingStatus_new");
ALTER TYPE "public"."BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "public"."BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "public"."BookingStatus_old";
ALTER TABLE "public"."Booking" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'admin';

-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_availabilitySlotId_fkey";

-- AlterTable
ALTER TABLE "public"."AvailabilitySlot" DROP COLUMN "endTime",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "durationMins" INTEGER NOT NULL,
ADD COLUMN     "locationType" "public"."LocationType" NOT NULL DEFAULT 'in_person',
ADD COLUMN     "maxParticipants" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "public"."Booking" DROP COLUMN "locationDetails",
DROP COLUMN "locationType",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "numParticipants" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "availabilitySlotId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."MentorSkill" ADD COLUMN     "skillLevel" "public"."SkillLevel";

-- AlterTable
ALTER TABLE "public"."Notification" ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" "public"."NotificationType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."UserProfile" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "socialMedia" TEXT;

-- CreateTable
CREATE TABLE "public"."Education" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "university" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "status" "public"."Status" NOT NULL DEFAULT 'on_going',
    "logoUrl" TEXT,
    "description" TEXT,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Experience" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "industry" TEXT,
    "expertise" TEXT,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "status" "public"."Status" NOT NULL DEFAULT 'on_going',
    "description" TEXT,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_availabilitySlotId_fkey" FOREIGN KEY ("availabilitySlotId") REFERENCES "public"."AvailabilitySlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."UserProfile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."UserProfile"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
