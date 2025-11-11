import { getFavorites, postFavorite } from "../controller/favorite.controller.js";
import { deleteFavorite } from "../controller/favorite.controller.js";
import { checkJWT } from "../middleware/security.js";


const getFavoritesRoute = {
    method: 'GET',
    url: '/:userId',
    preHandler: checkJWT,
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
    preHandler: checkJWT,
    handler: postFavorite
};

const deleteFavoriteRoute = {
    method: 'delete',
    url: '/',
    preHandler: checkJWT,
    handler: deleteFavorite
}

export {getFavoritesRoute, postFavoriteRoute, deleteFavoriteRoute}