import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../contexts/CartContext';
import ProductCard from './ProductCard';
import type { Product } from '../types/product';
const product:Product={id:1,title:'Fone de teste',description:'Um fone excelente para testes.',category:'audio',price:49.9,discountPercentage:0,rating:4.5,stock:10,brand:'ShopFlow',thumbnail:'https://dummyjson.com/image/400x300',images:[]};
function renderCard(){return render(<MantineProvider><MemoryRouter><CartProvider><ProductCard product={product}/></CartProvider></MemoryRouter></MantineProvider>)}
describe('ProductCard',()=>{it('exibe o nome e preço do produto',()=>{renderCard();expect(screen.getByText('Fone de teste')).toBeInTheDocument();expect(screen.getByText(/49,90/)).toBeInTheDocument();});it('permite adicionar o produto ao carrinho',async()=>{const user=userEvent.setup();renderCard();await user.click(screen.getByRole('button',{name:/adicionar ao carrinho/i}));expect(screen.getByRole('button',{name:/adicionar ao carrinho/i})).toBeInTheDocument();});});
