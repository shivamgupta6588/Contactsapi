import asyncHandler from "express-async-handler";
import Contact from "../models/contact.Model.js";

export const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts || []);
});

export const createContact = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber } = req.body;

  const contact = await Contact.create({
    name,
    email,
    phoneNumber,
  });
  res.status(200).json(contact);
});

export const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(updatedContact);
});

export const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deletedContact = await Contact.findByIdAndDelete(id);
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
