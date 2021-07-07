const Sauce = require('../models/sauce');
const fs = require('fs');
const { updateOne } = require('../models/sauce');
const multer = require('../middleware/multer-config');
const validate = require('../middleware/validate_input');

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }))
};

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => {
            console.log(json({ error }));
            res.status(400).json({ error });
        });
};

exports.modifySauce = (req, res, next) => {
    if (req.file) {
        //if the image's modified, deleting the previous one should go next
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    //once the old one is deleted in the dir, next update the rest
                    const sauceObject = {
                        ...JSON.parse(req.body.sauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
                })
            })
            .catch(error => res.statuus(500).json({ error }));
    } else {
        const sauceObject = {...req.body };
        Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
            .catch(error => res.status(400).json({ error }));
    }
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée!' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};

/**
 * LIKE / DISLIKE
 */
exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId;
    const rate = req.body.like;
    const sauceId = req.params.id;
    console.log(req)
    Sauce.findOne({ _id: sauceId })
        .then(sauce => {
            console.log(sauce)
                // new values
            let newValues = {
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked,
                likes: 0,
                dislikes: 0
            }


            // Switch case:
            switch (rate) {
                case 1: // case: sauce's liked
                    newValues.usersLiked.push(userId);
                    break;
                case -1: // case: sauce's disliked
                    newValues.usersDisliked.push(userId);
                    break;
                case 0: // case: canceling like/dislike
                    if (newValues.usersLiked.includes(userId)) {
                        // if like's canceled
                        const index = newValues.usersLiked.indexOf(userId);
                        newValues.usersLiked.splice(index, 1);
                    } else {
                        // if dislike's canceled
                        const index = newValues.usersDisliked.indexOf(userId);
                        newValues.usersDisliked.splice(index, 1);
                    }
                    break;
            };
            // Calculating likes / dislikes
            newValues.likes = newValues.usersLiked.length;
            newValues.dislikes = newValues.usersDisliked.length;
            // updating sauce new values
            Sauce.updateOne({ _id: sauceId }, newValues)
                .then(() => res.status(200).json({ message: 'Sauce notée !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
}