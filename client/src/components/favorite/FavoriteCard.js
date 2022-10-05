function FavoriteCard({ currentUser, favorite, handleCurrentUser }) {
   const {
      id,
      //   service_id,
      //   wishlist_id,
      name,
      description,
      price,
      image_url,
      //   service_type_id,
      service_type_name,
      //   duration_id,
      time_interval,
   } = favorite;

   const handleDelete = () => {
      fetch(`/favorites/${id}`, {
         method: 'DELETE',
      }).then((res) => {
         if (res.ok)
            res.json().then((deletedFave) => {
               fetch(`/users/${currentUser.id}`).then((res) => {
                  if (res.ok)
                     res.json().then((updatedUser) =>
                        handleCurrentUser(updatedUser)
                     );
               });
            });
      });
   };

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
            {!currentUser.is_admin && (
               <button onClick={handleDelete}>❌ remove fave</button>
            )}
         </div>
      </div>
   );
}

export default FavoriteCard;
