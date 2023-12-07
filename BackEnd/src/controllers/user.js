import Auth from "../models/auth.js";
import bcryptjs from 'bcryptjs';

export const update = async (req, res) => {

    try {

        const { password, username, email, avatar,role } = req.body;

        const user = await Auth.findOne({ _id: req.params.id })

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        if (password === '') {
            await Auth.findByIdAndUpdate({ _id: user._id }, { username, email, avatar,role }, {
                new: true,
            });

            return res.status(200).json({ success: true })
        } else if (password.length > 0) {
            const hashPassword = await bcryptjs.hash(password, 10)

            await Auth.findByIdAndUpdate({ _id: user._id }, { username, email, password: hashPassword, avatar,role }, {
                new: true,
            });

            return res.status(200).json({ success: true })
        }

        const newUser = await user.save({ username, password, avatar,role })

        return res.status(200).json(newUser)

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};

export const avatar = async (req, res) => {
    try {

        const { avatar } = req.body;

        const user = await Auth.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(403).json({ message: 'Unauthorized' })
        }

        await Auth.findByIdAndUpdate({ _id: user._id }, { avatar }, {
            new: true,
        });

        return res.status(200).json({ success: true })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const remove = async (req, res) => {

    try {
        const data = await Auth.findByIdAndDelete({ _id: req.params.id }, {
            new: true,
        });
        return res.status(200).json({
            message: "xoa USer thanh cong",
            data,
        });
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};


export const getOne = async (req, res) => {
    try {

        const data = await Auth.findById(req.params.id)
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.status(200).json({
            message: "Danh sách one",
            data,
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });

    }
}


export const getAll = async (req, res) => {
    const {
        // _limit = 7,
        _sort = "createAt",
        _order = "asc",
        _page = 1,
    } = req.query;

    const options = {
        // limit: _limit,
        page: _page,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        },
    };
    try {
        const data = await Auth.paginate({}, options);
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có dữ liệu",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};