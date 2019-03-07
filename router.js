import { Signin, Signup } from './controllers/authentication';
import passport from 'passport';

// Create an object and insert it between our incoming request and our route handler (i.e. Passport middleware - requireAuth)

import Student from './models/student';

const requireAuth = passport.authenticate('jwt', { session: false }); // When a user is authenticated don't try to create a session for them (by default, Passport tries to make a cookie-based session for the request - we're using tokens)

const requireSignin = passport.authenticate('local', { session: false });

export const Router = function(app) { // Inside this function we have access to our Express app

    app.get('/', requireAuth, function (req, res) {
        res.send('GET request to homepage');
    });

    app.post('/signin', requireSignin, Signin);

    app.post('/signup', Signup);

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get("/whoami", requireAuth, (req, res) => res.json(req.user));

    app.get('/students', requireAuth, function (req, res) {
        Student.find({})
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.sendStatus(500).json({success: false, msg: `Something didn't quite work right. ${err}`});
            });
    });

    app.get('/students/:id', requireAuth, function (req, res) {
        Student.findById(req.params.id)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.sendStatus(500).json({success: false, msg: `Something didn't quite work right. ${err}`});
            });
    });

    app.post('/students', (req, res) => {

        let newStudent = {
            fullName: req.body.fullName,
            school: req.body.school,
            teacher: req.body.teacher,
            gradeLevel: req.body.gradeLevel,
            ellStatus: req.body.ellStatus,
            compositeLevel: req.body.compositeLevel,
            active: req.body.active,
            designation: req.body.designation
        };
        const requiredFields = ['fullName', 'ellStatus', 'designation'];
        for (let i = 0; i < requiredFields.length; i++) {
            const field = requiredFields[i];
            if (!(field in req.body)) {
                const message = `Missing \`${field}\` in request body`
                console.error(message);
                return res.status(400).send(message);
            }
        }
        Student.create(newStudent);
            Student.find({})
              .then((result) => {
                  res.json(result);
              })
              .catch((err) => {
                  res.sendStatus(500).json({
                      success: false, msg: `Something didn't quite work right.
                  ${err}`
                  });
              })
    });

    app.put('/students/:id/', (req, res) => {

        let updatedStudent = {
            fullName: req.body.fullName,
            school: req.body.school,
            teacher: req.body.teacher,
            gradeLevel: req.body.gradeLevel,
            ellStatus: req.body.ellStatus,
            compositeLevel: req.body.compositeLevel,
            active: req.body.active,
            designation: req.body.designation
        };

        Student.findOneAndUpdate({_id: req.params.id}, updatedStudent)
            .then((oldResult) => {
                Student.findOne({_id: req.params.id})
                    .then((newResult) => {
                        res.json({
                            success: true,
                            msg: `Updated successfully`,
                            result: {
                                fullName: newResult.fullName,
                                school: newResult.school,
                                teacher: newResult.teacher,
                                gradeLevel: newResult.gradeLevel,
                                ellStatus: newResult.ellStatus,
                                compositeLevel: newResult.compositeLevel,
                                active: newResult.active,
                                designation: newResult.designation
                            }
                        });
                    }).catch((err) => {
                        console.error(err);
                        res.sendStatus(500).json({success: false});
                    });
            }).catch((err) => {
                if (err.errors) {
                    if (err.errors.school) {
                        res.sendStatus(400).json({success: false, msg: err.errors.school.message});
                        return;
                    }
                    if (err.errors.teacher) {
                        res.sendStatus(400).json({success: false, msg: err.errors.teacher.message});
                        return;
                    }
                    if (err.errors.gradeLevel) {
                        res.sendStatus(400).json({success: false, msg: err.errors.gradeLevel.message});
                        return;
                    }
                    if (err.errors.ellStatus) {
                        res.sendStatus(400).json({success: false, msg: err.errors.ellStatus.message});

                    }
                }
            });
    });

    app.delete('/students/:id', (req, res) => {
        Student.findOneAndRemove({_id: req.params.id}).exec();
        res.sendStatus(204).end();
    });
};


