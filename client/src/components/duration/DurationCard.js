function DurationCard({ duration, deleteDuration }) {
   const { id, time_interval } = duration;

   const handleDelete = () => {
      fetch(`/durations/${id}`, {
         method: 'DELETE',
      });

      deleteDuration(duration);
   };

   return (
      <div className="card center" key={id}>
         <h3>{time_interval} minutes</h3>
         <div className="card-actions">
            <button onClick={handleDelete}>❌ delete</button>
         </div>
      </div>
   );
}

export default DurationCard;
