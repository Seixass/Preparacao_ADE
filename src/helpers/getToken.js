export const getToken = (req, res) => {
    const authHeader = req.headers.authorization
    //Bearer "Token"
    const token = authHeader.split(" ")[1]
    return token;
}