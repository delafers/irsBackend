import LocalStrategy from 'passport-local'
import bcrypt from "bcrypt"
export const initialize = (passport, getUserByEmail, getUserById) => {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        console.log(email, password, user, "auth")
        if (user == null) {
            return done(null, false, {message: "No user with this email"})
        }
        try {
            if(await bcrypt.compare(password, user.password)){
                
                return done(null, user)
            }else{

                return  done(null, false, {message: "Password incorrect"})
            }
        }catch(e){
            return done(e)
        }
    }
    passport.use(new LocalStrategy.Strategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))})
}
