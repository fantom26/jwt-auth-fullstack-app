import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import TokenService from "./token.service.js";
import MailService from "./mail.service.js";
import UserDto from "../dtos/user.dto.js";
import { ApiError } from "../exceptions/api-error.js";

class UserService {
  async registration(body) {
    const { email, password } = body;
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`User with this email ${email} already exit`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4(); // 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
    const user = await UserModel.create({
      ...body,
      password: hashPassword,
      activationLink,
    });
    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = await TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Incorrect activation link");
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("User with this email not found");
    }

    const passEquals = await bcrypt.compare(password, user.password);

    if (!passEquals) {
      throw ApiError.BadRequest("Incorrect password");
    }

    const userDto = new UserDto(user);
    const tokens = await TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();

    return users;
  }
}

export default new UserService();
