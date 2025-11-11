import { getFavorites, postFavorite } from "../controller/favorite.controller.js";
import { deleteFavorite } from "../controller/favorite.controller.js";


const getFavoritesRoute = {
    method: 'GET',
    url: '/:userId',
    handler: getFavorites,
    schema: {
        params: {
            type: 'object',
            properties: {
                userId: { type: 'integer' }
            },
            required: ['userId']
        },
        response: {
            200: {
                description: 'Return user favorite restaurant',
                type: 'object',
                // properties: {
                //     favorite: { $ref: 'Favorite' }
                // }
            }
        }
    }
}

const postFavoriteRoute = {
    method: 'POST',
    url: '/',
    handler: postFavorite
};

const deleteFavoriteRoute = {
    method: 'delete',
    url: '/',
    handler: deleteFavorite
}

export {getFavoritesRoute, postFavoriteRoute, deleteFavoriteRoute}