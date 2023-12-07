import Auth from "../models/auth.js";
import Token from "../models/token.js";
import bcrypt from "bcryptjs";
import { signupSchema, signinSchema } from "../Schemas/auth.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import { v4 as uuidv4 } from 'uuid';

export const me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(201).json(null);
    }

    const user = await Auth.findOne({ _id: req.session.userId });

    user.password = undefined;
    user.cardnumber = undefined;

    return res.status(200).json(user);
};

export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const authExist = await Auth.findOne({ email: req.body.email });
        if (authExist) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const auth = await Auth.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            images: req.body.images,
            avatar: req.body.avatar,
        });

        const token = jwt.sign({ id: auth._id }, "123456", { expiresIn: "7d" });
        auth.password = undefined;

        return res.status(201).json({
            message: "Tạo tài khoản thành công",
            accessToken: token,
            auth,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const signin = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message),
            });
        }

        const auth = await Auth.findOne(
            usernameOrEmail.includes("@")
                ? { email: usernameOrEmail }
                : { username: usernameOrEmail }
        );

        if (!auth) {
            return res.status(400).json({
                message: usernameOrEmail.includes("@")
                    ? "Email không tồn tại"
                    : "Tên người dùng không đúng",
            });
        }

        const isMatch = await bcrypt.compare(password, auth.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không đúng",
            });
        }

        const token = jwt.sign({ id: auth._id }, "123456", { expiresIn: "1d" });

        res.cookie("accessToken", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        auth.password = undefined;

        req.session.userId = auth.id;
        req.session.accessToken = token;

        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            auth,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const logout = (req, res) => {
    return new Promise((resolve, _reject) => {
        res.clearCookie("accessToken");
        req.session.destroy((error) => {
            if (error) {
                console.log("SESSION_ERROR", error);
                resolve(false);
                return res.status(201).json(false)
            }
            resolve(true);
            return res.status(201).json(true)
        });
    });
};

export const forgotPassword = async (req, res) => {

    const { email, otp } = req.body;

    const user = await Auth.findOne({ email })

    if (!user) return res.status(201).json({ success: false });

    await Token.findOneAndDelete({ userId: user._id })

    const resetToken = uuidv4();

    const hashResetToken = await bcrypt.hash(resetToken, 10);

    await new Token({ userId: `${user.id}`, token: hashResetToken }).save();

    await sendEmail(email, otp)

    return res.status(200).json({ success: true, otp, token: hashResetToken, userId: user._id })
}

export const changePassword = async (req, res) => {
    const { password, token, userId } = req.body;


    try {
        const resetPasswordTokenRecord = await Token.findOne({ userId });

        if (!resetPasswordTokenRecord) return res.status(401).json({ message: 'Token không hợp lệ' });

        const resetPasswordTokenValid = bcrypt.compare(resetPasswordTokenRecord.token, token);

        if (!resetPasswordTokenValid) return res.status(401).json({ message: 'Token không hợp lệ' });

        const user = await Auth.findOne({ _id: userId });

        if (!user) return res.status(400).json({ message: 'Người dùng không tồn tại' });

        const updatedPassword = await bcrypt.hash(password, 10);

        await Auth.updateOne({ _id: userId }, { password: updatedPassword });

        await resetPasswordTokenRecord.deleteOne();

        return res.status(201).json({ success: true });

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}
