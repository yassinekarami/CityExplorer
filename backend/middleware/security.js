import  jwt  from 'jsonwebtoken';

const SECRET_KEY = "RXCT34ZE5GFDSFD756";

exports.checkJWT = async(req, res, next) => {

    let token = req.header['x-access-token'] || req.header['authorization'];
    if (!!tojen && token.startsWith("Bearer")) 
        token = token.slice(7, token.length);

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.code(401).send("token_not_valid");
            }
            else {
                req.decoded = decoded;
                const expiresIn = 24 * 60 * 60;
                const newToken = jwt.sign({
                    user: decoded.user
                },
                SECRET_KEY,
                {
                    expiresIn: expiresIn
                });

                res.header("Authorization", "Bearer "+ newToken);
                next();
            }
        });
    } else {
        return res.code(401).send("token_required");
    }
}