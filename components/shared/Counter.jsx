'use client'
import { addToCart, removeFromCart } from "@/lib/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Counter = ({ productId }) => {

    const { cartItems } = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const addToCartHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(addToCart({ productId }))
    }

    const removeFromCartHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(removeFromCart({ productId }))
    }

    return (
        <div 
            className="inline-flex items-center gap-1 sm:gap-3 px-3 py-1 rounded border border-slate-200 max-sm:text-sm text-slate-600"
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}
            onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}
        >
            <button onClick={removeFromCartHandler} className="p-1 select-none">-</button>
            <p 
                className="p-1 select-none cursor-default pointer-events-none" 
            >
                {cartItems[productId]}
            </p>
            <button onClick={addToCartHandler} className="p-1 select-none">+</button>
        </div>
    )
}

export default Counter