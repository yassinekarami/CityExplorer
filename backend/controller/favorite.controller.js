import { Favorite } from "../model/favorite.model.js";
import { favoriteCol } from "../db/mangodb.js";

const postFavorite = async function(req, res) {
    
    const favorite = {
        userId: '1',
        nomoffre: req.body['nomoffre']
    }
   return await Favorite.create(favorite)
  
};

const getFavorites = async function(req, res) {
    
    return await Favorite.find({userId: req.params['userId']})
};

const deleteFavorite = async function(req, res) {
    console.log(req.params)
};


export {getFavorites, postFavorite, deleteFavorite};