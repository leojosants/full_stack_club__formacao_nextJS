import "server-only";
import { db } from "@/app/_lib/prisma";


export interface SaleDTO {
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

                productNames: sale.saleProducts.map(
                    (saleProduct) => {
                        return saleProduct.product.name
                    }
                ).join(" • "),

                totalAmount: sale.saleProducts.reduce(
                    (acc, saleProduct) => {
                        return acc = saleProduct.quantity * Number(saleProduct.unitPrice)
                    }, 0
                ),

                totalProducts: sale.saleProducts.reduce(
                    (acc, saleProduct) => {
                        return acc + saleProduct.quantity
                    }, 0
                ),
            }
        )
    );
};