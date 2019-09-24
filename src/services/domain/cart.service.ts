import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Cart } from '../../models/cart';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }

    createOrClearCart() : Cart {
        //criar ou limpar carrinho no local storage
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        //Pegar carrinho no local storage
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart {
        //findIndex -funcao do java script para encontrar a posicao do elemento.Se ele não existir ele retorna -1
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position == -1) {
            cart.items.push({quantidade: 1, produto: produto});
        }
        this.storage.setCart(cart);
        return cart;
    }
}