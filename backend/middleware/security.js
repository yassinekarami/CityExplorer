import  jwt  from 'jsonwebtoken';

const SECRET_KEY = "RXCT34ZE5GFDSFD756";

const checkJWT = async(req, res) => {
    
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!!token && token.startsWith("Bearer")) 
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
            }
        });
    } else {
        return res.code(401).send("token_required");
    }
}

export {checkJWT};