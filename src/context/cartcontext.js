import React, { useContext, useState }  from 'react';
export const CartContext = React.createContext([]);

export const useCartContext = () => useContext(CartContext);


export const CartProvider = ({Children}) => {
    const [ cart, setCart] = useState([]);

    console.log('carrito: ', cart);

    const addProduct = (item,quantity) => {
        if (isInCart(item.id)){
            setCart(cart.map(product => {
                return product.id === item.id ? { ... product, quantity: product.quantity + quantity} : product 
            }));
        } else {
            setCart([...cart, {...item, quantity}]);
        }
    }

    const cleanCart = () => setCart([]);

    const isInCart = (id) => cart.find(product => product.id === id) ? true : false;

    const  removeProduct = (id) => setCart (cart.filter(product => product.id !== id));


    return (
        <CartContext.Provider value={{
            cleanCart,
            isInCart,
            removeProduct,
            addProduct
        }}>
            {Children}
        </CartContext.Provider>
    )
};

export default CartProvider;
