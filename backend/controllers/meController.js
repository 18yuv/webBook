export default function meController(req, res) {
    res.status(200).json({ user: { id: req.user.id, email: req.user.email }});
}