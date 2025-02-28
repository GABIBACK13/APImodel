import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers ;
  if (!authorization) {
    return res.status(401).json({errors: ['autorização recusada'],})
  }

  const [ text, token ] = String(authorization).split(' ');
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const {id, email} = data;
    req.userId = id;
    req.userEmail = email;
    
    next();
  } catch (error) {
    return res.status(401).json({errors: ['token inválido'],})
  }
};
