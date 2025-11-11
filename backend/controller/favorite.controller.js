import { Favorite } from "../model/favorite.model.js";

/**
 * add a new favorite
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const postFavorite = async function(req, res) {
    const favorite = {
        userId: req.body["_id"],
        nomoffre: req.body['nomoffre']
    }
    try {
        let fav = await Favorite.findById("69139bd78a915ce89cce3d0a");
        
        if (!fav) {
            fav = await Favorite.create(favorite)
        }    
        else {
            // Update by pushing to the existing arrays (without overwriting)
            fav = await Favorite.findByIdAndUpdate(
                "69139bd78a915ce89cce3d0a",
                    {
                        $push: {
                            userId: favorite.userId,
                            nomoffres: favorite.nomoffre
                        }
                    },
                    { new: true } // return updated document
                );
            }

    return res.code(200).send(fav)
        
    } catch(error) {
        console.error(error);
        return res.code(500).send({ message: "Error updating favorites", error });
    }
  
};

const getFavorites = async function(req, res) {
    
    return await Favorite.find({userId: req.params['_id']})
};

/**
 * delete favorite
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteFavorite = async function(req, res) {
    try {
        const favorite = {
            userId: req.body["_id"],
            nomoffre: req.body['nomoffre']
        }
        await Favorite.findOneAndDelete(favorite)
        return res.code(200).send({ message: "Favorite deleted successfully"});

    } catch(error) {
        console.error(error);
        return res.code(500).send({ message: "Error deleting favorites", error });

    }
   
};


export {getFavorites, postFavorite, deleteFavorite};