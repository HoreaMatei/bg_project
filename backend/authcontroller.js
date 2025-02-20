import { createUser, login, enforceAuth } from "./auth.js";

export async function signup(req, res) {
  try {
    const { email, password } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      return res
        .status(400)
        .send({ error: "Invalid email or password, try again" });
    }
    const token = createUser(email, password);
    res.status(201).send({ message: "User created successfully", token });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(400).send({ error: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const token = login(email, password);
    res.status(200).send({ message: "Login successfull", token });
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).send({ error: error.message });
    }
    res.status(500).send({
      error: "Login failed, please check credentials",
    });
  }
}
