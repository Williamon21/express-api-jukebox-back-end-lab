// Bring in the Track Model
const Track = require("../models/track");
// Set up routing with express
const express = require("express");
const router = express.Router();

/*
    HTTP Method	Controller	Response	URI	Use Case
    POST	create	200	/tracks	Create a track
    GET	index	200	/tracks	List tracks
    GET	show	200	/tracks/:trackId	Get a single track
    PUT	update	200	/tracks/:trackId	Update a track
    DELETE	deleteTrack	204	/tracks/:trackId	Delete a track
*/

// POST /tracks
router.post("/", async (req, res) => {
  try {
    const newTrack = await Track.create(req.body);
    res.status(201).json({
      message: `Track ${newTrack.title} created successfully`,
      track: newTrack, 
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});


// GET /tracks
router.get("/", async (req, res) => {
  try {
    const tracks = await Track.find(); // ({}) // give me all the tracks
    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// GET /tracks/:trackId
router.get("/:trackId", async (req, res) => {
  try {
    const foundTrack = await Track.findById(req.params.trackId);
    // If no track is founds, lets just return our 404 error message
    if (!foundTrack) return res.status(404).json({ message: "Track Not Found" });
    // Now we know that we have a track, lets send it back
    res.status(200).json({ foundTrack });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});


// DELETE /tracks/:trackId
router.delete("/:trackId", async (req, res) => {
  try {
    const foundTrack = await Track.findById(req.params.trackId);
    if (!foundTrack) {
        res.status(404)
        throw new Error("Track not Found")
    };

    await foundTrack.deleteOne();
    res
      .status(200)
      .json({ message: "Track Successfully Deleted", track: foundTrack });
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ err: error.message });
    } else {
      res.status(500).json({ err: error.message });
    }
  }
});


router.put('/:trackId', async (req, res)=>{
    try {
        // new:true makes sure the track returned from findByIdAndUpdate is the updated track with the new values
        const updatedTrack = await Track.findByIdAndUpdate(req.params.trackId, req.body, {new: true})

        if(!updatedTrack) return res.status(404).json({ message: "Track Not Found" });

        res.status(200).json({
            message: "Updated Successfully",
            track: updatedTrack
        })
    } catch (error) {
         res.status(500).json({ err: error.message });
    }
})

module.exports = router;
