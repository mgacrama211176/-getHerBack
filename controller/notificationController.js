import { createError } from "../error.js";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.URI;

export const fetchAllNotif = async (request, response, next) => {
  const client = new MongoClient(uri);
  const { selectedId, status } = request.body;
  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const notification = database.collection("notifications");
    try {
      const fetchAll = await notification
        .find({ selectedId: selectedId, status: false })
        .toArray();
      response.status(202).json(fetchAll);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

export const addNotif = async (request, response, next) => {
  const client = new MongoClient(uri);
  const { userId, selectedId } = request.body;

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const notification = database.collection("notifications");

    const AddNotification = {
      userId: userId,
      selectedId: selectedId,
      status: false,
    };

    const insertedNotification = await notification.insertOne(AddNotification);

    response.status(200).json(insertedNotification);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

export const updateNotif = async (request, response, next) => {
  const client = new MongoClient(uri);
  const { selectedId } = request.body;

  try {
    await client.connect();
    const database = client.db("GetherPairingDB");
    const notification = database.collection("notifications");

    const fetchRequesting = await notification
      .find({ selectedId: selectedId })
      .toArray();

    response.status(200).json(fetchRequesting);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
