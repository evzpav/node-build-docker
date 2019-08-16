const DocumentsCtrl = (Document) => {
    const DocumentObj = {};

    DocumentObj.GetAll = (req, res) => {
        Document.find((err, doc) => {
            if (err) {
                res.json({ status: false, error: 'GetAll went wrong' });
                return;
            }
            res.json({ status: true, doc: doc });
        });
    };

    DocumentObj.Get = (req, res) => {
        Document.findById(req.params.id, (err, doc) => {
            if (err) {
                res.json({ status: false, error: 'Get went wrong' });
                return;
            }
            res.json({ status: true, doc: doc });
        });
    };

    DocumentObj.InsertOrUpdate = (req, res) => {
        const newDoc = new Document(req.body);

        if (newDoc._id === undefined) {
            res.json({ status: false, error: 'Missing _id property' });
            return;
        }

        Document.findOneAndUpdate({ _id: newDoc._id },
            { $set: newDoc },
            { new: true, upsert: true },
             (err, doc) => {
                if (err) {
                    res.json({ status: false, error: 'Insert went wrong' });
                    return;
                }
                res.json({ status: true, doc: doc });
            }
        );
    };

    DocumentObj.Delete = (req, res) => {
        const id = req.params.id;

        Document.findByIdAndRemove({_id: id }, (err, doc) => {
            doc["_id"] = id;

            if (err) {
                res.json({ status: false, error: 'Delete went wrong' });
                return;
            }
            res.json({ status: true, doc: doc });
        });
    };

    return DocumentObj;
};

module.exports = DocumentsCtrl;
