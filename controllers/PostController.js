import postModel from "../models/post.js";

export const getLastTags = async (req, res) => {
    try{
        const posts = await postModel.find().limit(5).exec();

        const tags = posts
        .map(obj => obj.tags)
        .flat()
        .slice(0, 5);

        res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cant get the articles',
        });
    }
}

export const  getAll = async (req, res) => {
    try{
        const posts = await postModel.find().populate('user').exec();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cant get the articles',
        });
    }
}

export const  getOne = async (req, res) => {
    try{
        const postId = req.params.id;

        postModel.findOneAndUpdate(
        {
                _id: postId,
        }, 
        {
            $inc: { viewsCount: 1 },
        },
        {
            returnDocument: 'after',
        },
        (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Cant get the article',
                });
            }


            if(!doc) {
                return res.status(404).json({
                    message: 'Article not found',
                });
            }

            res.json(doc);
        },
        ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cant get the articles',
        });
    }
};

export const  remove = async (req, res) => {
    try{
        const postId = req.params.id;

        postModel.findOneAndDelete(
            {
            _id: postId,
        }, 
        (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Cant delete the article',
                }); 
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Article not found',
                });
            }

            res.json({
                success: true,
            });
        },
    );
       
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cant get the articles',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new postModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create article',
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await postModel.updateOne({
            _id: postId,
        }, 
        {
           title: req.body.title,
           text: req.body.text,
           imageUrl: req.body.imageUrl,
           user: req.userId,
           tags: req.body.tags.split(','), 
        },
    );

    res.json({
        success: true,
    });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update article',
        });
    }
}