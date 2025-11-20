export function setAuthCookie(res, token) {
    res.cookie('token', token, {
        httpOnly: true,
        // secure: true,       // enable in production (HTTPS)
        // sameSite: "None",   // enable if frontend is on another domain
        path: '/',
        maxAge: 30 * 60 * 1000 // 30 minutes
    });
}