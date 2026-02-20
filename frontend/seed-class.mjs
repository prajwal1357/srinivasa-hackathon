// Quick seed script — run with: node seed-class.mjs
import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://prajwalvr1357_db_user:prajju123@cluster0.w8uzne1.mongodb.net/hackpack";

await mongoose.connect(MONGODB_URI);
console.log("Connected to MongoDB");

// First, ensure we have at least one admin faculty to use as createdBy
const Faculty = mongoose.models.Faculty || mongoose.model("Faculty", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  status: { type: String, default: "approved" },
  role: { type: String, default: "admin" },
  isActive: { type: Boolean, default: true },
}, { timestamps: true }));

let admin = await Faculty.findOne({ role: "admin" });
if (!admin) {
  // Create a placeholder admin (password: "admin123" hashed with bcrypt)
  admin = await Faculty.create({
    name: "Admin",
    email: "admin@college.edu",
    password: "$2a$10$X7tXq5Z5Z5Z5Z5Z5Z5Z5ZuX7tXq5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z", // placeholder
    status: "approved",
    role: "admin",
  });
  console.log("Created admin faculty:", admin._id);
}

// Now create the Class model
const Class = mongoose.models.Class || mongoose.model("Class", new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: String, enum: ["1st", "2nd", "3rd"], required: true },
  program: { type: String, default: "BCA" },
  section: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
}, { timestamps: true }));

// Insert classes
const classesToAdd = [
  { name: "1st BCA A", year: "1st", program: "BCA", section: "A", createdBy: admin._id },
  { name: "2nd BCA A", year: "2nd", program: "BCA", section: "A", createdBy: admin._id },
  { name: "3rd BCA A", year: "3rd", program: "BCA", section: "A", createdBy: admin._id },
];

for (const cls of classesToAdd) {
  try {
    const created = await Class.create(cls);
    console.log(`✅ Created class: "${created.name}" → _id: ${created._id}`);
  } catch (err) {
    if (err.code === 11000) {
      console.log(`⚠️  Class "${cls.name}" already exists, skipping.`);
    } else {
      console.error(`❌ Error creating "${cls.name}":`, err.message);
    }
  }
}

await mongoose.disconnect();
console.log("\nDone! Classes are now in the database.");
