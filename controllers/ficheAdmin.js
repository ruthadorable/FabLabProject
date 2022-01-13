const Equipment = require("../models/equipment");
const Use = require("../models/use")
const User= require("../models/user");
const Invoice=require("../models/invoice");
const  jwt_decode  = require("jwt-decode");
const { crossOriginResourcePolicy } = require("helmet");
const { Op, DATE } = require("sequelize");

exports.getUserById=async(req,res,next)=>{
    const token=req.cookies.jwt_token;
    const decoded = jwt_decode(token);
    const id=decoded.sub;
    try{
     const userById =await User.findOne({
        where: {id:id},
     })
     console.log(userById);
     return res.json(userById)
    }catch(err){}
    
}

exports.updateAdmin=async(req,res)=>{
    const token=req.cookies.jwt_token;
    const decoded = jwt_decode(token);
    const id=decoded.sub;
    const {nom,prenom,email,motdepasse,confmotdepasse}=req.body;
    //gestion des duplicate emails
    const user=User.findOne({where:{id}})
    if(email==user.email)
    {
        res.send("email déjà dans la base de donnée!");
    }
    else{

    try{
        const userById =await User.findOne({
            where: {id }})
       if(nom!==""&&email!==""&&prenom!=""&&motdepasse!=="")
       {
        
           userById.update({
               first_name:prenom,
               last_name:nom,
               email:email,
               password: motdepasse
           },{
               where : {id:id}
           });
           res.clearCookie('id');
           res.redirect("/frontend/admin/pages/profile_update_reception.html");
       }
    }catch(err){}
}
}
exports.getAdminEquipementById=async (req,res)=>{
    const id=req.params.id;
    try{
      const equipementParId = await Equipment.findOne({
        where: {id },
      })   
      return res.json(equipementParId); 
    }catch(err){}
  }

exports.createEquipement=async(req,res)=>{
    const {nom,tarif,image,description}=req.body;
    const imagedefault="../../images/ajoutimage.JPG".toString();
    try{
        const newEquipement=Equipment.create({
        name:nom,
        price_minute:tarif,
        image: imagedefault,
        description: description
        });
        res.redirect("/frontend/admin/pages/equipmentstable.html");
    }catch(err)
    {}
}
exports.updateEquipement=async(req,res)=>{
    const idmachine = req.params.id;
    const {nom,tarif,image,reserved,description}=req.body;
    const imagedefault="../../images/ajoutimage.JPG".toString();
    try{
        const equipmentById =await Equipment.findOne({
            where: {id:idmachine }});
       if(nom!==""&&tarif!==""&&image!=""&&description!=="")
       {
           equipmentById.update({
               name:nom,
               price_minute:tarif,
               image: image,
               description:description
           },{where:{id:idmachine}});
        }   
           res.redirect("/frontend/admin/pages/equipmentstable.html");
    }catch(err){}
}
exports.deleteEquipement=async(req,res)=>{
    const idmachine= req.params.id;
    try{
    Equipment.destroy({
        where:{id:idmachine}
    });
    res.redirect("/frontend/admin/pages/equipmentstable.html");
    }catch(err){}
}
exports.getUsers=async(req,res)=>{
    try{
        const allusers= await User.findAll();
        return res.json(allusers);
    }catch(err){
    }
}
exports.getUserfromAdmin=async(req,res)=>{
    const iduser=req.params.id;
    try{
        const userbyid=await User.findOne({where:{id:iduser}})
        return res.json(userbyid);
    }
    catch(err){ console.log("error");}
}
exports.newUser=async(req,res)=>{
    const {nom,prenom,email,password,role}=req.body;
    try{//gestion des doublons emails
        const same=User.findOne({where:{email:email}});

        if(same.email==email){
            res.send("email déjà dans la base de donnée");
         
    }else{
        User.create({
            first_name: prenom,
            last_name: nom,
            email: email,
            password: password,
            role_id: role,
            
        });
    res.redirect("/frontend/admin/pages/userstable.html");
    }
    }catch(err){
        res.send("erreur on api post user create")
    }
}

exports.updateUserfromAdmin=async(req,res)=>{
    const iduser=req.params.id;
    const {nom,prenom,email,motdepasse,role}=req.body;
    //gestion des duplicate emails
    try{
        const userById=await User.findOne({where:{id:iduser}})
       if(nom!==""&&email!==""&&prenom!=""&&motdepasse!=="")
       {   
           userById.update({
               first_name:prenom,
               last_name:nom,
               email:email,
               password: motdepasse,
               role_id: role
           });
           res.redirect("/frontend/admin/pages/userstable.html");
       }
    }catch(err){}

    }
exports.deleteUser=async(req,res)=>{
    const iduser= req.params.id;
    try{
    Equipment.destroy({
        where:{id:iduser}
    })
    res.redirect("/frontend/admin/pages/userstable.html");
    }catch(err){}

}

exports.newFacture=async(req,res)=>{
    const {numero,date,total,utilisateurid,equipementid}=req.body;
    try{
    
        const equipment=await Equipment.findOne({where:{id:equipementid}});
        const use=await Use.create({
            durating_M: total/equipment.price_minute,
            amount_to_be_paid: total,
            date: date
        })
        const invoice=await Invoice.create({
            num: numero,
            date: date,
            amount_total: total,
            userId: utilisateurid
        })
        use.setUser(utilisateurid);
        use.setEquipment(equipementid);
        invoice.setUser(utilisateurid);
        invoice.setUse(use);
        
        res.redirect("/frontend/admin/pages/invoicestable.html");
    }
    catch(err){

    }
}
exports.getFactures=async(req,res)=>{
    try{
        const all=await Invoice.findAll();
        return res.json(all);
    }
    catch(err){

    }
}
exports.getFactureById=async(req,res)=>{
    const idfacture=req.params.id;
    try{
        const invoice=Invoice.findOne({where:{id:idfacture}})
        return res.json(invoice);
    }catch(err){}
}
exports.updateFacture=async(req,res)=>{
    const idfacture=req.params.id;
    const {numero,date,total,utilisateur}=req.body;
    try{
        const user=await User.findOne({where:{first_name:utilisateur.toString()}})
        const invoice= await Invoice.findOne({where:{id:idfacture}})  
        //gestion d'erreurs
   
           invoice.update({
               num: numero,
               date: date,
               amount_total: total,
               userId: user.id
           });
           res.redirect("/frontend/admin/pages/invoicestable.html");
    }catch(err){
        console.log(err);
    }
}
exports.getFactureByIdfromAdmin= async (req,res)=>{
    const id=req.params.id;
    
    try{
      const factureParId = await Invoice.findOne({
        include: Use,
        where: {id:id },
      })   
      return res.json(factureParId); 
    }catch(err){}
  }
// exports.deleteFacture=async(req,res)=>{
//     try{
//     const idfacture=req.params.id;
//     //gestion d'erreurs
//     if(true)
//     {
//         Invoice.destroy({
//             where : {id:idfacture}
//         });
//         res.redirect("/frontend/admin/pages/invoicestable.html");
//     }
//  }catch(err){}
// }
exports.getUtilisations=async(req,res)=>{
    try{
        const uses=await Use.findAll();
        return res.json(uses);
    }catch(err){
    }
}
exports.newUtilisationByAdmin=async(req,res)=>{
    const {equipementid,date,duree,userid}=req.body;
    try{
        const equipment=await Equipment.findOne({where:{id:equipementid}})
        await Use.create({
            durating_M:duree,
            amount_to_be_paid: duree*equipment.price_minute,
            date: date,
            userId:userid,
            equipmentId:equipementid,
            facturé:false
        });
        
        res.redirect("/frontend/admin/pages/usestable.html");
    }catch(err){

    }

}
exports.getUtilisationsById=async(req,res)=>{

    try{
        const iduse=req.params.id;
        const useById=await Use.findAll({});
        console.log(useById)
        return res.json(useById);
    }catch(err){
        console.log("get use by id error")
    }
}
exports.updateUtilisation=async(req,res)=>{
        const iduse=req.params.id;
        const {id,minutes,date,total,userid,equipement_id}=req.body;
        try{
            const use=Use.findOne({where:{id}})  
                //gestion d'erreurs
               if(true)
               {
                
                   use.update({
                       id, id,
                       durating_M:minutes,
                       date: date,
                       amount_to_be_paid: total,
                       userId: userid,
                       equipmentId: equipement_id
                   },{
                       where : {id:iduse}
                   });
                   res.redirect("/frontend/admin/pages/usestable.html");
               }
            }catch(err){}
}

exports.getMembers=async(req,res)=>{
    try{
        const members=await User.findAll({where:{role_id:2}})
        return res.json(members);
    }catch(err){

    }
}

exports.createFacture=async(req,res)=>{
    

   
    console.log(req.body)
    const user = parseInt(req.body.userid)
    const debutD = req.body.debutDate
    const finD = req.body.finDate
    let tot = 0;    
    const useByUserId = await Use.findAll(
        {
            where: {
                [Op.and]: [
                    {
                        userid : user,
                        invoiceId : null
                    }
                ],   
                date:  
                {
                    [Op.between]: [debutD, finD]
                }  
              
            },
                       
        })
    useByUserId.forEach(element => {
       // console.log(element.amount_to_be_paid)
        tot = tot + element.amount_to_be_paid
      //  console.log(tot)
    });
    const factTab = await Invoice.findAll({
        where : {
            date:  
                {
                    [Op.between]: [debutD, finD]

                }
        }
    });
      
    const annee = new Date(req.body.debutDate).getFullYear()
    const mois = new Date(req.body.debutDate).getMonth()+1
    const moisStr = mois.toString().padStart(2,'0')
    let nFacture = factTab.length+1
            
    if (nFacture<=9){
        nFacture = "00" + nFacture.toString()
    }else if(nFacture<99 && nFacture>9){
        nFacture =  "0" + nFacture.toString()
    }

    const numFact = annee+moisStr+nFacture
    
    const invoice = await Invoice.create({
        num : numFact,
        date : new Date(),
        amount_total : tot,
        payé : false,
        userId : user
    })

    useByUserId.forEach(async element =>{

        await Use.update({
            invoiceId : invoice.id
        },{
            where :{
                id : element.id
            }
        })

    })
    
    res.redirect("/frontend/admin/pages/invoicestable.html");
    
 }



exports.deleteUseById=async(req,res)=>{
    const id=req.params.id;
    try{
        Use.destroy({where:{id:id}})

    }catch(err){

    }
}
exports.getFactureDetailsByIdfromAdmin=async(req,res)=>{
    const id=req.params.id;
    try{
        const invoice=await Invoice.findOne({where:{useId:id}})
        return res.json(invoice);
    }catch(err){

    }
}

exports.getUtilisationsById=async(req,res)=>{
    try{
        const iduse=req.params.id;
        const useById=Use.findOne({where:{id:iduse}});
        return res.json(useById);
    }catch(err){
        console.log("get use by id error")
    }
}

exports.getUseByEquipmentId=async(req,res)=>{
    const idmachine=req.params.id;
    try{
        const use=await Use.findOne({where:{equipmentId:idmachine}});
        return res.json(use);
    }catch(err){

    }
}
exports.createUseByUserIdAsParams=async(req,res)=>{
    const iduser=req.params.id;
    const {date,duree,equipement,idusername}=req.body;
    try{
        // const equipement=await Equipment.findOne({where:{id:equipementid}});
        const use=Use.create({
            durating_M: duree,
            amount_to_be_paid: duree*equipement.price_minute,
            date: date,
            userId: idusername,
            facturé: false,
            equipmentId:equipement
        })
        res.redirect("/frontend/admin/pages/usestable.html");

    }catch(err){

    }

}
exports.getFacturesByUser=async(req,res)=>{
    const iduser= req.params.id;
    try{
        const invoices=Invoice.findAll({where:{userId:iduser}});
        return res.json(invoices);
    }catch(err){

    }

}