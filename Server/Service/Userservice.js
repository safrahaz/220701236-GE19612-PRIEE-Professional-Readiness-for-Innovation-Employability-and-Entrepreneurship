import {client,dbname1} from '../Model/index.js';
import auth from '../Auth.js';
const login = async (req, res) => {
    try {
        await client.connect();
        let db = client.db(dbname1);
        console.log(req.body.email);
        let data = await db.collection("userdetails").findOne({ email: req.body.email });
        if (data) {
            const passwordMatch = await auth.compare(req.body.password, data.password);
            if (passwordMatch) {
                let payload = {
                    _id: data._id,
                    Name: data.name,
                    email: data.email,
                };
                let token = auth.createToken(payload);
                res.status(200).send({
                    message: 'Logged in successfully',
                    token,
                    Name:data.name,
                    Email:data.email
                });
            } else {
                res.status(400).send({
                    message: 'Password wrong'
                });
            }
        } else {
            res.status(500).send({
                message: "Invalid email"
            });
        }
    } catch (err) {
        res.status(400).send({
            message: err.message || 'Internal server error'
        });
    }
}
const create_login = async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname1);
        const { name, email, password,con_pass,phone,age,state} = req.body;
        if (password !== con_pass) {
            res.status(400).send({
                message: "Passwords do not match"
            });
            return;
        }

        const hashedPassword = await auth.encrypt(password);

        await db.collection("userdetails").insertOne({
            name,
            email,
            password: hashedPassword,
            phone,
            age,
            state,
        });

        res.status(200).send({
            message: 'Account created successfully'
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Internal server error'
        });
    }
}
export default{login,create_login};
