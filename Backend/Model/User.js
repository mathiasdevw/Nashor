import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

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
    trim: true,
    validate: {
      validator: function(v) {
        return /^\d{11}$/.test(v);
      },
      message: 'CPF deve ter 11 dígitos numéricos'
    }
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
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Email inválido'
    }
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
  },
  role: {
    type: String,
    enum: ['user', 'manager'],
    default: 'user'
  }
}, {
  timestamps: true
});

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
