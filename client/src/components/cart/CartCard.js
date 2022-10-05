function CartCard({ item, setCart, deleteCartItem }) {
   const {
      id,
      name,
      description,
      price,
      service_type_name,
      time_interval,
      image_url,
   } = item;

   const handleDelete = () => deleteCartItem(item);

   return (
      <div className="card center" key={id}>
         <img src={image_url} alt={name} />
         <h2>{name}</h2>
         <h3>{description}</h3>
         <h3>Price: ${price}</h3>
         <h3>Service Type: {service_type_name}</h3>
         {service_type_name === 'Spa' && (
            <h3>Duration: {time_interval} mins</h3>
         )}
         <div className="card-actions">
            <button onClick={handleDelete}>❌ remove from cart</button>
         </div>
      </div>
   );
}

export default CartCard;
