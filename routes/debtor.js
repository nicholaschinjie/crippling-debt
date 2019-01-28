const fs = require('fs');

module.exports = {
    addDebtorPage: (req, res) => {
        res.render('add-debtor.ejs', {
            title: "Crippling Debt | Add new debtor"
            ,message: ''
        });
    },
    addDebtor: (req, res) => {


        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let phone = req.body.phone;
        let email = req.body.email;
        let amount_owed = req.body.amount_owed;
        let amount_borrowed = req.body.amount_borrowed;
        let datetime = req.body.date;

        let usernameQuery = "SELECT * FROM debtors WHERE phone = '" + phone + "'";
        

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Debtor still owes you, just increase his debt';
                res.render('add-debtor.ejs', {
                    message,
                    title: "Crippling Debt| Add new debtor"
                });
            } else {
                        // send the player's details to the database
                        let query = "INSERT INTO debtors (first_name, last_name, phone, email, amount_owed, amount_borrowed, duedate) VALUES ('" +
                            first_name + "', '" + last_name + "', '" + phone + "' , '" + email + "', '" + amount_owed + "', '" + amount_borrowed + "', '" + datetime + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            
                            if (amount_owed > 0) {
                                const lib = require('lib')({token: 'kAOj_w-g7bkVQ9sz758CSaWkqkcUVt-9XW8n90TSwly45MSk-QqtsbkHL2jVsLSB'});
                                const sms = lib.utils.sms['@1.0.9'];

                                sms({
                                   to: phone, // (required)
                                   body: 'Hey ' + first_name + ', you still owe Nicholas ' + ' $' + amount_owed + ' ' + ' Kindly pay me back soon!' // (required)
                                    
       });
                            res.redirect('/');
                    }
            });
    }
        });
    },
        
    editDebtorPage: (req, res) => {
        let debtorId = req.params.id;
        let query = "SELECT * FROM debtors WHERE id = '" + debtorId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-debtor.ejs', {
                title: "Edit Debtor"
                ,debtor: result[0]
                ,message: ''
            });
        });
    },
    editDebtor: (req, res) => {
        let debtorId = req.params.id;
        let duedate = req.body.duedate;
        let amount_borrowed = req.body.amount_borrowed;


        let query = "UPDATE debtors SET amount_borrowed = '" + amount_borrowed + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            const lib = require('lib')({token: 'kAOj_w-g7bkVQ9sz758CSaWkqkcUVt-9XW8n90TSwly45MSk-QqtsbkHL2jVsLSB'});
                                const sms = lib.utils.sms['@1.0.9'];

                                sms({
                                   to: 17788551020, // (required)
                                   body: 'Hey there, you still owe Nicholas ' + ' $ ' +  amount_borrowed +  'Kindly pay him back soon!' // (required)
                                });
            res.redirect('/');
        });
    },
    
    deleteDebtor: (req, res) => {
        let debtorId = req.params.id;
        let deleteUserQuery = 'DELETE FROM debtors WHERE id = "' + debtorId + '"';


            db.query(deleteUserQuery, (err, result) => {
                 if (err) {
                     return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
    }
};
