const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, 'Rua é obrigatória'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'Cidade é obrigatória'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'Estado é obrigatório'],
    trim: true
  },
  zipCode: {
    type: String,
    required: [true, 'CEP é obrigatório'],
    trim: true
  },
  country: {
    type: String,
    default: 'Brasil',
    trim: true
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    minlength: [2, 'O Nome deve ter pelo menos 2 caracteres']
  },
  cpf: {
    type: String,
    required: [true, 'CPF é obrigatório'],
    unique: true,
    trim: true
  },
  birthDate: {
    type: Date,
    required: [true, 'Data de nascimento é obrigatória']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres']
  },
  address: {
    type: addressSchema,
    required: [true, 'Endereço é obrigatório']
  },
  phone: {
    type: String,
    required: [true, 'Telefone é obrigatório'],
    trim: true
  }
}, {
  timestamps: true
});

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);