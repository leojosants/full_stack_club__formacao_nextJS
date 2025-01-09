import "server-only";
import { db } from "@/app/_lib/prisma";


interface SaleProductDTO {
    productName: string;
    productId: string;
    unitPrice: number;
    quantity: number;
};

export interface SaleDTO {
    saleProducts: SaleProductDTO[];
    totalProducts: number;
    productNames: string;
    totalAmount: number;
    id: string;
    date: Date;
};

export const getSales = async (): Promise<SaleDTO[]> => {
    const sales = await db.sale.findMany(
        {
            include: {
                saleProducts: {
                    include: { product: true }
                },
            },
        }
    );

    return sales.map(
        (sale): SaleDTO => (
            {
                id: sale.id,

                date: sale.date,

                productNames: sale
                    .saleProducts
                    .map((saleProduct) => saleProduct.product.name)
                    .join(" • "),

                totalAmount: sale
                    .saleProducts
                    .reduce((acc, saleProduct) => acc = saleProduct.quantity * Number(saleProduct.unitPrice), 0),

                totalProducts: sale
                    .saleProducts
                    .reduce((acc, saleProduct) => acc + saleProduct.quantity, 0),

                saleProducts: sale
                    .saleProducts
                    .map(
                        (saleProduct): SaleProductDTO => (
                            {
                                productId: saleProduct.productId,
                                productName: saleProduct.product.name,
                                quantity: saleProduct.quantity,
                                unitPrice: Number(saleProduct.unitPrice),
                            }
                        )
                    ),
            }
        )
    );
};