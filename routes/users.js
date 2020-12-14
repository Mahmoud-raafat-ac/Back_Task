var express = require('express');
var router = express.Router();
const User = require('../models').User;

/* GET users listing. */
router.get('/user-list', function(req, res, next) {
        
    User.findAll().then ((result)=>{
        
//        result.forEach((user)=>{
//              console.log(user.Name) 
//        }        
//        );
            
//            arry_name = [];
//            arry_phone = [];
//            arry_mail = [];
//            arry_univer = [];
//            arry_gradyear = [];
//            arry_fwork = [];
//            arry_swork = [];
//            arry_user =[];
//            for (user in result){
//                userN = result[user].Name;
//                userP = result[user].Phone;
//                userE = result[user].Email;
//                userU = result[user].University;
//                userG = result[user].Grad_year;
//                userFW = result[user].First_Workshop;
//                userSW = result[user].Second_Workshop;
//                arry_user.push(userN, userP, userE, userU, userG, userFW, userSW);
//            }
//            const size = 7;
//            var arrTotal = arry_user.reduce((acc, curr, i) => {
//                if(!(i%size)){acc.push(arry_user.slice(i, i+size));
//            }
//                 return acc;
//            }
//            , []);
//            console.log(arrTotal);
        
            res.render('table', { data : result });   
    
    });
        
    
});
module.exports = router;