import jwt from 'jsonwebtoken';

export const authenticateManager = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Verificar se o usuário é manager
    if (decoded.role !== 'manager') {
      return res.status(403).json({ message: 'Acesso negado. Apenas managers podem acessar esta rota.' });
    }

    req.user = decoded;
    next();
  });
};
