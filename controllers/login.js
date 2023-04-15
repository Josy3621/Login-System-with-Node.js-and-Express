const mongoose = require('mongoose')
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    try {
        if(user){
            bcrypt.compare(password,user.password, (error,result)=>{
                if(error){
                    console.log('error')
                    res.redirect('/failed')
                }
                else{
                    if(result){
                        req.session.userId = user._id
                        res.redirect('/successful')
                    }
                    else{
                        console.log('error')
                        res.redirect('/failed')
                    }
                    
                }
                
            })

        }
        else{
            console.log('error')
            res.redirect('/failed')
        }
        
    } catch (error) {
        
    }
}