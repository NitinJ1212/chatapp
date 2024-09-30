

const signup = async (req, res) => {
    const { username, password, mobile, image } = req.body
    if (!username || !password || !mobile || !image) {
        res.status(400).send({ status: false, message: "All field are mendatory." })
    } else {
        try {
            const newUser = new User({
                username,
                password,
                mobile,
                image,
            });
            const saved = await newUser.save();
            if (saved) {
                res.status(201).send({ status: true, message: "You are Successfully Signup." })
            } else {
                res.status(400).send({ status: true, message: "Something went wrong." })
            }
        } catch (error) {
            console.log(error);
        }
    }
}