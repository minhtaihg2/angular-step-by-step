/**
 * Created by taipham on 9/29/14.
 */



var crud = function () {
    return function (model) {
        return {

            read: function (req, res) {
                var _id = req.params.id;
                var opts = [];
                var flag; // check populate hasOwnProperty

                if (!model.hasOwnProperty('getPopulation')) {
                    // if false => not use populate
                    flag = false;

                } else {
                    flag = true;
                    // create options : array args is path

                    var dataPopulate = model.getPopulation();
                    for (var i = 0; i < dataPopulate.length; i++) {

                        if (dataPopulate[i][1] === '*') {
                            opts.push({path: dataPopulate[i][0]}); // filter all

                        } else {
                            // filter for field
                            opts.push({path: dataPopulate[i][0], select: dataPopulate[i][1]});

                        }
                    }
                }
                if (!_id) {

                    if (req.query.limit) {
                        var limitItem = req.query.limit;
                    }
                    if (req.query.number) {
                        var page = req.query.number
                    }
                    model.find().limit(limitItem).sort({ CreateAt: -1}).skip(page * limitItem).exec(function (err, result) {

                        if (err) {
                            res.json(err);
                            console.log('err : ', err);
                        } else {
                            if (!!flag) {
                                var promise = model.populate(result, opts);
                                promise.then(function (err, data) {
                                    res.json(result);

                                }).end();
                            } else {
                                res.json(result);

                            }
                        }
                    });
                } else {

                    model.findById(_id, function (err, result) {
                        var dataID = [];
                        if (err) {
                            res.json(err);
                            console.log('err : ', err);
                        } else {
                            model.populate(result, opts, function (err, data) {
                                dataID.push(result);
                                res.json(dataID);
                            })
                        }
                    })
                }
            },
            create: function (req, res) {
                var data = new model(req.body);

                data.save(function (err, result) {
                    if (err) {
                        res.json(err);
                    } else {
                        console.log('Add item success ', result);
                        res.json(result);

                    }
                })
            },
            update: function (req, res) {
                var _id = req.params.id;
                model.update({'_id': _id}, req.body, function (err, result) {
                    if (err) {
                        res.json(err);
                    } else {
                        console.log('Update item success ', result);
                        res.json(result);
                    }
                })
            },
            deleteId: function (req, res) {
                var _id = req.body;
                model.findById(_id, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        result.remove({}, function (err) {
                            console.log('Remove id : ', _id);
                        })
                    }
                })
            }
        }
    }
};

module.exports = crud();