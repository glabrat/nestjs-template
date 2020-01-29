import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import * as bcryptjs from 'bcryptjs'

import { User } from 'src/users/users.schema'
import { UserInput } from 'src/users/users.input'
import { Token } from './interfaces/token.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly jwt: JwtService,
  ) {}

  async login(user: User): Promise<Token> {
    const payload = { email: user.email, sub: user.id }
    return {
      accessToken: this.jwt.sign(payload),
    }
  }

  async signUp(createUserDto: UserInput): Promise<User> {
    const password = await bcryptjs.hash(createUserDto.password, 10)
    const createdItem = new this.userModel({ ...createUserDto, password })
    return await createdItem.save()
  }

  async validateUser(userInput: UserInput): Promise<User | null> {
    const { email, password } = userInput

    const user = await this.userModel.findOne({ email })

    if (!user) return null

    const valid = await bcryptjs.compare(password, user.password)

    return valid ? user : null
  }

  async validate({ id }): Promise<User | null> {
    const user = await this.userModel.findOne({ _id: id })
    if (!user) throw Error('Authenticate validation error')
    return user
  }
}
