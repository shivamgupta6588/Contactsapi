import asyncHandler from "express-async-handler";
import Contact from "../models/contact.Model.js";

export const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ userref: req.currentUser.id });
  res.status(200).json(contacts || []);
});

export const createContact = asyncHandler(async (req, res) => {
  const token = req.cookies.access_token;
  // console.log("Token:", token);

  try {
    const user = req.currentUser;
    // console.log(user);

    const { name, email, phoneNumber } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phoneNumber,
      userref: user.id,
    });

    res.status(200).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Failed to create contact" });
  }
});

export const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userId = req.currentUser.id;

  // Find the contact by id and userref (user id)
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, userref: userId },
    req.body,
    { new: true }
  );

  if (!updatedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  res.status(200).json(updatedContact);
});

export const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userId = req.currentUser.id;

  // Find the contact by id and userref (user id)
  const deletedContact = await Contact.findOneAndDelete({
    _id: id,
    userref: userId,
  });

  if (!deletedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  res.status(200).json({ message: "Contact deleted successfully" });
});

export const getContactById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(contact);
});
