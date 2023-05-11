import mongoose from 'mongoose'

const usersCollection = 'users'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String/*, required: true*/ },
  firstName: { type: String/*, required: true*/ },
  lastName: { type: String/*, required: true*/ },
  age: { type: Number/*, required: true*/ },
  role: { type: String, enum: ['user', 'admin'], default: 'user'/*, required: true*/ },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  }

}, { versionKey: false })

export const userModel = mongoose.model(usersCollection, userSchema)

class UserManager {
  #usersDb
  constructor() {
    this.#usersDb = mongoose.model(usersCollection, userSchema)
  }

  async saveUser(dataUser) {
    let userSaved = await this.#usersDb.create(dataUser)
    userSaved = JSON.parse(JSON.stringify(userSaved))
    return userSaved
  }

  async getAllUsers() {
    const users = await this.#usersDb.find().lean()
    return users
  }

  async getUserById(id) {
    const user = await this.#usersDb.findById(id).lean()
    return user
  }

  async getUserByEmail(email) {
    const user = await this.#usersDb.findOne({ email });
    return user
  }
}

export const userManager = new UserManager()
