-- CreateTable
CREATE TABLE "Jet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "wingspan" DOUBLE PRECISION NOT NULL,
    "numberOfEngines" INTEGER NOT NULL,
    "manufacturingYear" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jet_pkey" PRIMARY KEY ("id")
);
