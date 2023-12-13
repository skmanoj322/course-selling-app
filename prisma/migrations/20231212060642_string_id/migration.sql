/*
  Warnings:

  - The primary key for the `Cource_Brought` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Cource_Brought" DROP CONSTRAINT "Cource_Brought_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Cource_Brought" DROP CONSTRAINT "Cource_Brought_customerId_fkey";

-- AlterTable
ALTER TABLE "Cource_Brought" DROP CONSTRAINT "Cource_Brought_pkey",
ALTER COLUMN "customerId" SET DATA TYPE TEXT,
ALTER COLUMN "courseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cource_Brought_pkey" PRIMARY KEY ("courseId", "customerId");

-- AlterTable
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Courses_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Courses_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Cource_Brought" ADD CONSTRAINT "Cource_Brought_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cource_Brought" ADD CONSTRAINT "Cource_Brought_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
