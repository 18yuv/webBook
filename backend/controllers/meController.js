export default function meController(req, res){
    res.status(200).json({message: `welcome ${req.user.name}, ${req.user.email}`})
}