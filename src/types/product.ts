import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(), title: z.string(), description: z.string(), category: z.string(), price: z.number(),
  discountPercentage: z.number().optional().default(0), rating: z.number().optional().default(0), stock: z.number().optional().default(0),
  brand: z.string().optional().default('Marca independente'), thumbnail: z.string().url(), images: z.array(z.string().url()).optional().default([]),
});
export type Product = z.infer<typeof productSchema>;
export const productsResponseSchema = z.object({ products: z.array(productSchema), total: z.number(), skip: z.number(), limit: z.number() });
export type ProductsResponse = z.infer<typeof productsResponseSchema>;
export const loginResponseSchema = z.object({ id: z.number(), username: z.string(), email: z.string().optional(), firstName: z.string().optional(), lastName: z.string().optional(), accessToken: z.string().optional(), token: z.string().optional() });
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export const productFormSchema = z.object({ title: z.string().min(3, 'Informe ao menos 3 caracteres.'), description: z.string().min(8, 'A descrição deve ter ao menos 8 caracteres.'), price: z.number().positive('O preço deve ser maior que zero.'), category: z.string().min(2, 'Informe a categoria.'), thumbnail: z.string().url('Informe uma URL de imagem válida.'), stock: z.number().int().min(0, 'O estoque não pode ser negativo.') });
export type ProductFormValues = z.infer<typeof productFormSchema>;
