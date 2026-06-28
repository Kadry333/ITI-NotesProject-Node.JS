const Notes = require("../models/notesModel");


const getAllNotes = async(req, res) => {
    try{
        let query = {
            user:req.user._id
        };
        //search with title or content
        if(req.query.search){
            query.$or = [
                {
                title : {
                    $regex : req.query.search,
                    $options : "i"
                },
            },
            {
                content : {
                    $regex : req.query.search,
                    $options : "i"
                },
            },
            ];
        }

        //filter by category or status
        if(req.query.category){
            query.category = req.query.category;
        }
        if(req.query.status){
            query.status = req.query.status;
        }

        let noteQuery = Notes.find(query);

        //sort
        if(req.query.sort){
            noteQuery = noteQuery.sort(req.query.sort);
        }
        else{
            noteQuery = noteQuery.sort("-createdAt");
        }

        //pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        noteQuery = noteQuery.skip(skip).limit(limit);
        
        const notes = await noteQuery;
        const total = await Notes.countDocuments(query); //total notes without pagination
        res.status(200).json({
            success:true,
            message:"Notes fetched successfully",
            "results":notes.length,
            page,
            totalPages: Math.ceil(total / limit),
            data:notes
        });
    }
    catch(err){
        res.status(500).json({
            status:"fail",
            message:err.message
        });
    }
};
const getNote = async(req, res) => {
    try{
        const note = await Notes.findOne({
            _id:req.params.id,
            user:req.user._id
        });
        if(!note){
            return res.status(404).json({
                status:"fail",
                message:"Note not found"
            });
        }
        
        res.status(200).json({
            status:"success",
            message:"Note fetched successfully",
            data:note
        });
    }
    catch(err){
        res.status(500).json({
            status:"fail",
            message:err.message
        });
    }
};

const createNote = async(req, res) => {
    try{
        const newNote = await Notes.create({
            ...req.body,
            user:req.user._id
        });
        res.status(201).json({
            status:"success",
            message:"Note created successfully",
            data:newNote
        });
    }
    catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        });
    }
};

const updateNote = async(req,res) =>{
    try{
         const note = await Notes.findOneAndUpdate({
            _id:req.params.id,
            user:req.user._id
         },req.body,{
        new:true,
        runValidators:true
    });

    if(!note){
        return res.status(404).json({
            status:"fail",
            message:"Note not found"
        });
    }

    res.status(200).json({
        status:"success",
        message:"Note updated successfully",
        data:note
    });
    }
    catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        });
    }
}

const deleteNote = async(req,res) =>{
    try{
        const note = await Notes.findOneAndDelete({
            _id:req.params.id,
            user:req.user._id
        });
        if(!note){
            return res.status(404).json({
                status:"fail",
                message:"Note not found"
            });
        }

        res.status(200).json({
            status:"success",
            message:"Note deleted successfully",
        });
    }
    catch(err){
        res.status(500).json({
            status:"fail",
            message:err.message
        });
    }
    

}
module.exports = {createNote, getAllNotes, getNote, updateNote, deleteNote};