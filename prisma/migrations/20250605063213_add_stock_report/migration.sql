-- CreateTable
CREATE TABLE "StockReport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stockId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "note" TEXT,
    "productId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "archivedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StockReport_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
