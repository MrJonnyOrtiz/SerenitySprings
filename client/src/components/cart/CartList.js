import CartCard from './CartCard';

function CartList({ cart, setCart }) {
   const deleteCartItem = (deletedCartItem) => {
      const updatedCart = cart.filter((item) => item.id !== deletedCartItem.id);
      setCart(updatedCart);
   };

   const cartEl = cart.map((item) => (
      //show cart item
      <CartCard
         key={item.id}
         item={item}
         // currentUser={currentUser}
         // service={service}
         // updateService={updateService}
         // deleteService={deleteService}
         // serviceTypes={serviceTypes}
         // durations={durations}
         // handleFave={handleFave}
         setCart={setCart}
         deleteCartItem={deleteCartItem}
      />
   ));

   return (
      <div>
         <h2>{cartEl.length === 0 ? 'Empty Cart' : 'Cart'}</h2>
         <div className="wrapper">{cartEl}</div>
      </div>
   );
}

export default CartList;
