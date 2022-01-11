const Equipment = require("../models/equipment");
const Use = require("../models/use");
const User= require("../models/user");
const Invoice=require("../models/invoice");
const  jwt_decode  = require("jwt-decode");
const InvoiceDetail = require("../models/invoicedetail");
const { crossOriginResourcePolicy } = require("helmet");

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
    const {nom,tarif,image,reserved,description}=req.body;
    const imagedefault="../../images/ajoutimage.JPG".toString();
    try{
        const newEquipement=Equipment.create({
        name:nom,
        price_minute:tarif,
        image: imagedefault,
        reserved:reserved,
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
       if(nom!==""&&tarif!==""&&image!=""&&reserved!==""&&description!=="")
       {
           equipmentById.update({
               name:nom,
               price_minute:tarif,
               image: image,
               reserved: reserved,
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
        where: {id:id },
      })   
      return res.json(factureParId); 
    }catch(err){}
  }
exports.deleteFacture=async(req,res)=>{
    try{
    const idfacture=req.params.id;
    //gestion d'erreurs
    if(true)
    {
        Invoice.destroy({
            where : {id:idfacture}
        });
        res.redirect("/frontend/admin/pages/invoicestable.html");
    }
 }catch(err){}
}
exports.getUtilisations=async(req,res)=>{
    try{
        const uses=await Use.findAll();
        console.log(uses.json())
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
        const useById=Use.findOne({where:{id:iduse}});
        return res.json(useById);
    }catch(err){
        console.log("get use by id error")
;    }
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
                       durating_id:minutes,
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
let cptfacture;
const now=new Date();
if(now.getDate()==1)
{
    cptfacture=0;
}


exports.createFacture=async(req,res)=>{
    
    const {debut,fin,userid}=req.body;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var seqfacture= String(++cptfacture).padStart(3,'0');
    const numfacture=Number(yyyy+dd+mm+seqfacture);


    try{
        const usesByIdByMonth=await Use.findAll({where:{
            userId:userid,
            date:{
                [Op.gte]: debut,
                [Op.lt]: fin
            },
            facturé:false
        }});
        
        const uses=usesByIdByMonth.json()
        console.log(uses);
        const montant=()=>{let total;
            uses.map((use)=>{
            /*const equipement= Equipment.findOne({where:{id:use.equipementId}}) */
            total+=use.amount_total;
        })
        return total;};
        const newInvoice=await Invoice.create({
            num: numfacture,
            date: today,
            amount_total: montant
        });
        const objectToUpdate = {
            facturé: true
            };
            await Use.findAll({ where:{
                userId:iduser,
                date: {
                    $gt: debut,
                    $lt: fin
                }
            }}).then((result) => {
               if(result){
               // Result is array because we have used findAll. 
                    result.map((x)=>{
                        x.set(objectToUpdate);
                        x.save();
                    })
                   // result[0].set(objectToUpdate); // seul le premier est modifié
                   // result[0].save(); // This is a promise
            }
            })
        newInvoice.setUses(uses.map(x=>x.id));
        res.redirect('/frontend/admin/pages/invoicestable.html');
    }catch(err){}
}
exports.getUtilisationById=async(req,res)=>{
    const iduse=req.params.id;
    try{
        const use=await Use.findOne({where:{id:iduse}})
        return res.json(use);
    }catch(err){
    }
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
    const {date,duree,equipementid}=req.body;
    try{
        const equipement=await Equipment.findOne({where:{id:equipementid}});
        const use=Use.create({
            durating_M: duree,
            amount_to_be_paid: duree*equipement.price_minute,
            date: date,
            userId: iduser,
            facturé: false,
            equipmentId:equipementid
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