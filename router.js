import { Signin, Signup, validateSignup } from './controllers/authentication.js';
import passport from 'passport';
import { body, validationResult } from 'express-validator';

// Create an object and insert it between our incoming request and our route handler (i.e. Passport middleware - requireAuth)

import Student from './models/student.js';

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors.array().map(err => ({ field: err.path, message: err.msg }))
    });
  }
  next();
};

const handleServerError = (res, err, message = 'Internal server error') => {
  console.error(err);
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ error: message });
  } else {
    res.status(500).json({ error: message, details: err.message });
  }
};

const requireAuth = passport.authenticate('jwt', { session: false }); // When a user is authenticated don't try to create a session for them (by default, Passport tries to make a cookie-based session for the request - we're using tokens)

const requireSignin = passport.authenticate('local', { session: false });

export const Router = function(app) { // Inside this function we have access to our Express app

    app.get('/', requireAuth, function (req, res) {
        res.send('GET request to homepage');
    });

    app.post('/signin', requireSignin, Signin);

    app.post('/signup', validateSignup, handleValidationErrors, Signup);

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
                handleServerError(res, err, 'Failed to retrieve students');
            });
    });

    app.get('/students/:id', requireAuth, function (req, res) {
        Student.findById(req.params.id)
            .then((result) => {
                if (!result) {
                    return res.status(404).json({ error: 'Student not found' });
                }
                res.json(result);
            })
            .catch((err) => {
                handleServerError(res, err, 'Failed to retrieve student');
            });
    });

    app.post('/students', requireAuth, [
        body('fullName').trim().isLength({ min: 1 }).withMessage('Full name is required'),
        body('ellStatus').trim().isLength({ min: 1 }).withMessage('ELL status is required'),
        body('designation').trim().isLength({ min: 1 }).withMessage('Designation is required'),
        body('gradeLevel').optional().isInt({ min: 1, max: 12 }).withMessage('Grade level must be between 1 and 12'),
        body('school').optional().trim().escape(),
        body('teacher').optional().trim().escape()
    ], handleValidationErrors, (req, res) => {
        const newStudent = {
            fullName: req.body.fullName,
            school: req.body.school,
            teacher: req.body.teacher,
            gradeLevel: req.body.gradeLevel,
            ellStatus: req.body.ellStatus,
            compositeLevel: req.body.compositeLevel,
            active: req.body.active,
            designation: req.body.designation
        };
        
        Student.create(newStudent)
            .then(() => Student.find({}))
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                handleServerError(res, err, 'Failed to create student');
            });
    });

    app.put('/students/:id/', requireAuth, [
        body('fullName').trim().isLength({ min: 1 }).withMessage('Full name is required'),
        body('ellStatus').trim().isLength({ min: 1 }).withMessage('ELL status is required'),
        body('designation').trim().isLength({ min: 1 }).withMessage('Designation is required'),
        body('gradeLevel').optional().isInt({ min: 1, max: 12 }).withMessage('Grade level must be between 1 and 12'),
        body('school').optional().trim().escape(),
        body('teacher').optional().trim().escape()
    ], handleValidationErrors, (req, res) => {
        const updatedStudent = {
            fullName: req.body.fullName,
            school: req.body.school,
            teacher: req.body.teacher,
            gradeLevel: req.body.gradeLevel,
            ellStatus: req.body.ellStatus,
            compositeLevel: req.body.compositeLevel,
            active: req.body.active,
            designation: req.body.designation
        };

        Student.findOneAndUpdate({_id: req.params.id}, updatedStudent, { new: true })
            .then((result) => {
                if (!result) {
                    return res.status(404).json({ error: 'Student not found' });
                }
                res.json({
                    success: true,
                    message: 'Updated successfully',
                    result: result
                });
            })
            .catch((err) => {
                handleServerError(res, err, 'Failed to update student');
            });
    });

    app.delete('/students/:id', requireAuth, (req, res) => {
        Student.findOneAndRemove({_id: req.params.id})
            .then((result) => {
                if (!result) {
                    return res.status(404).json({ error: 'Student not found' });
                }
                res.status(204).end();
            })
            .catch((err) => {
                handleServerError(res, err, 'Failed to delete student');
            });
    });
};


