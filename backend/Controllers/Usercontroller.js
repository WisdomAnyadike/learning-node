const userModel = require("../Models/Usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Signup = async (req, res, next) => {
    const { FullName, Email, Password } = req.body;
    if (!FullName || !Email || !Password) {
        res.status(400);
        return next(new Error("All field are mandatory"));
    }
    try {
        const validateUser = await userModel.findOne({ Email });
        if (validateUser) {
            res.status(400).send({ message: "email already in user" });
        } else {
            const hashedPassword = await bcrypt.hash(Password, 10);
            const createUser = await userModel.create({
                FullName,
                Email,
                Password: hashedPassword,
            });
            if (createUser) {
                res.status(200).send({
                    message: `Account created successfully for ${createUser.FullName}`,
                    status: "success",
                });
            } else {
                res.status(400).send({ message: `Unable to create account` });
            }
        }
    } catch (error) {
        res.status(500).send({ message: `Internal server error` });
        console.log(error);
    }
};

const LogIn = async (req, res) => {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
        res.status(400).send({ message: "all fields are mandatory" });
    }
    try {
        const LoggedUser = await userModel.findOne({ Email });
        if (!LoggedUser) {
            res
                .status(400)
                .send({ message: "account doesnt exist , try creating an account" });
        } else {
            const comparePassword = await bcrypt.compare(
                Password,
                LoggedUser.Password
            );
            const secretKey = process.env.JWT_SECRET;

            const genToken = await jwt.sign(
                {
                    user: {
                        FullName: LoggedUser.FullName,
                        Email: LoggedUser.Email,
                    },
                },
                secretKey,
                { expiresIn: "1d" }
            );

            if (comparePassword) {
                res.status(200).send({
                    message: "login successful",
                    genToken,
                    status: "success",
                    FullName: LoggedUser.FullName,
                });
            } else {
                res.status(400).send({ message: "login unsuccessful" });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const editacc = async (req, res) => {
    const user = req.user;
    console.log("User : ", user);
    if (!user) {
        res.status(400).send({ message: " Authentication not provided " });
    } else {
        console.log("user tyring to edit account", user);
        const { FullName, Email, Password } = req.body;
        if (!FullName || !Email || !Password) {
            res.status(400).send({ message: " All fields are mandatory" });
        } else {
            if (user.Email === Email && user.FullName === FullName){
                res.status(400).send({message: 'cannot use the same email & username'})   
               }else {
                try {
                    const hashPassword = await bcrypt.hash(Password, 10);

                    const userToUpdate = await userModel.findOneAndUpdate(
                        { Email: user.Email },
                        { Email, FullName, hashPassword },
                        { new: true }
                    );
                    if (!userToUpdate) {
                        console.log("couldnt find user to be updated ");
                    } else {
    
                    
                            console.log("updating list.." + userToUpdate);
                            res
                                .status(200)
                                .send({
                                    message: "user has been updated",
                                    status: "success",
                                    FullName: FullName,
                                });
                        
                     
                    }
                } catch (error) {
                    console.log(error);
                }


                
               }

          
        }
    }
};

const deleteUser = async (req, res) => {
    const user = req.user;
    console.log("user:", user);
    
    if (!user) {
        res.status(400).send({ message: "Authentication not provided" });
        return; // Added return to exit the function early
    }
    
    console.log("user trying to delete account", user);

    try {
        const accountToDelete = await userModel.findOneAndDelete({
            Email: user.Email,
        });

        if (!accountToDelete) {
            console.log("Account not found or already deleted");
            res.status(404).send({ message: "Account not found" });
            return; // Added return to exit the function early
        }

        console.log("Account successfully deleted");
        res.status(200).send({ message: `${user.FullName}'s account deleted`, status: "success" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = { Signup, LogIn, editacc, deleteUser };
