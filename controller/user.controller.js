class UserController {
    async createUser(req, res){
        const {name, surname} = req.body
        console.log(name, surname)
        res.json('ok')
    }
    async getUsers(req, res){
        res.send('Hello Worlds!!!!')
    }
    async getOneUser(req, res){

    }

    async deleteUser(req, res){

    }

}

module.exports = new UserController()
