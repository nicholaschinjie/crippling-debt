module.exports = {
        getLogin: (req, res) => {
            res.render('login-page.ejs', {
                title: "CripplingDebt | Login",
        });
        },
    
        Login: (req, res) => {
            
        },
    
        getCreateAccount: (req, res) => {
            res.render('create-acc.ejs', {
                title: "CripplingDebt | Login,"
            })
        },
}
    
        