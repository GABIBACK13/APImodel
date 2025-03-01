import jwt from 'jsonwebtoken';
import User from '../models/user';

export default async (req, res, next) => {
  const { authorization } = req.headers ;
  if (!authorization) {
    return res.status(401).json({errors: ['autorização recusada'],})
  }

  const [ text, token ] = String(authorization).split(' ');
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const {id, email} = data;

    const user = await User.findOne({where: {id, email,}});

    if(!user) {
      return res.status(401).json({errors: ['Usuario inválido'],})
    }

    req.userId = id;
    req.userEmail = email;
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({errors: ['token inválido'],})
  }
};
