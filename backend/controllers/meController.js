export default function meController(req, res) {
    res.status(200).json({ user: { id: req.user.id, name:req.user.name, email: req.user.email }});
}