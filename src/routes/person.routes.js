import express from "express";
import Person from "../models/person.model.js";

const router = express.Router();

// fetch all persons
router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.json({ success: true, data: persons });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// create a new person
router.post("/", async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.json({ success: true, data: person });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// update a person
router.put("/:id", async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!person) {
      return res.json({ success: false, message: "Person not found" });
    }
    res.json({ success: true, data: person });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// delete a person
router.delete("/:id", async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.json({ success: false, message: "Person not found" });
    }
    res.json({ success: true, message: "Person deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

export default router;
