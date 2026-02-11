import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { clearCart, removeFromCart, updateItemQuantity } from '../redux/cartSlice'

export default function Cart() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { items, totalPrice, totalItems } = useAppSelector((state) => state.cart)
    const formattedTotal = useMemo(() => totalPrice.toFixed(2), [totalPrice])

    const handleContinue = useCallback(() => {
        navigate('/')
    }, [navigate])

    const handleDecrease = useCallback(
        (id: number, quantity: number) => {
            dispatch(updateItemQuantity({ id, quantity: quantity - 1 }))
        },
        [dispatch]
    )

    const handleIncrease = useCallback(
        (id: number, quantity: number) => {
            dispatch(updateItemQuantity({ id, quantity: quantity + 1 }))
        },
        [dispatch]
    )

    const handleRemove = useCallback(
        (id: number) => {
            dispatch(removeFromCart(id))
        },
        [dispatch]
    )

    const handleClearCart = useCallback(() => {
        dispatch(clearCart());
    }, [dispatch])

    if (items.length === 0) {
        return (
            <section className="page page-cart">
                <div className="section-header">
                    <div>
                        <h1>Shopping Cart</h1>
                        <p className="section-subtitle">No items yet. Pick something you love.</p>
                    </div>
                </div>
                <div className="state">Cart is empty.</div>
                <button className="btn btn-primary" type="button" onClick={handleContinue}>Continue Shopping</button>
            </section>
        )
    }

    return (
        <section className="page page-cart">
            <div className="section-header">
                <div>
                    <h1>Shopping Cart</h1>
                    <p className="section-subtitle">Review items and adjust quantities.</p>
                </div>
                <button className="btn btn-ghost cart-remove" type="button" onClick={() => handleClearCart()}>Clear Cart</button>
            </div>
            <div className="cart-layout">
                <div className="cart-list">
                    {items.map((item) => (  
                        <article key={item.product.id} className="cart-item">
                            <div className="cart-item_media">
                                <img src={item.product.thumbnail} alt={item.product.title} />
                            </div>
                            <div className="cart-item_body">
                                <div className="cart-item_header">
                                    <div>
                                        <h3>{item.product.title}</h3>
                                        <span className="cart-item_brand">{item.product.brand}</span>
                                    </div>
                                    <div className="cart-item_total">
                                        <span className="cart-item_label">Item Total:</span>
                                        <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
                                    </div>
                                </div>
                                <div className="cart-item_row">
                                    <div className="cart-item_price">
                                        <span className="cart-item_label">Price</span>
                                        <span>${item.product.price.toFixed(2)}</span>
                                    </div>
                                    <div className="cart-item_controls">
                                        <span className="cart-item_label">Quantity</span>
                                        <div className="cart-qty">
                                            <button
                                                className="btn btn-ghost cart-btn"
                                                type="button"
                                                onClick={() => handleDecrease(item.product.id, item.quantity)}
                                            >
                                                -
                                            </button>
                                            <span className="cart-item_qty">{item.quantity}</span>
                                            <button
                                                className="btn btn-ghost cart-btn"
                                                type="button"
                                                onClick={() => handleIncrease(item.product.id, item.quantity)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button className="btn btn-ghost cart-remove" type="button" onClick={() => handleRemove(item.product.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                <aside className="cart-summary">
                    <h2 className='cart-summary_heading'>Order Summary</h2>
                    <div className="cart-summary_row">
                        <span>Total Items:</span>
                        <span>{totalItems}</span>
                    </div>
                    <div className="cart-summary_divider" />
                    <div className="cart-summary_row cart-summary_total">
                        <span>Total Price:</span>
                        <strong>${formattedTotal}</strong>
                    </div>
                    <button className="btn btn-primary cart-summary_btn" type="button" onClick={handleContinue}>
                        Continue Shopping
                    </button>
                </aside>
            </div>
        </section>
    )
}
