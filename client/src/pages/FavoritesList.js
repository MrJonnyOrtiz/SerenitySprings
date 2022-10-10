import { useDocumentTitle } from '../hooks/useDocumentTitle';
import FavoriteCard from '../components/favorite/FavoriteCard';

function FavoritesList({ currentUser, handleCurrentUser }) {
   useDocumentTitle('Serenity Springs - Favorites List');

   const favoritesEl = currentUser.favorites.map((favorite) => (
      <FavoriteCard
         key={favorite.id}
         currentUser={currentUser}
         favorite={favorite}
         handleCurrentUser={handleCurrentUser}
      />
   ));

   return (
      <div>
         <h2>{favoritesEl.length === 0 ? 'No Faves' : 'Faves'}</h2>
         <div className="wrapper">{favoritesEl}</div>
      </div>
   );
}

export default FavoritesList;
