// Lis system locks

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma Kodu", default: "" },
    lid: { type: String, label: "Kilit ID", default: "" },
    lockkey: { type: String, label: "Kilit Anahtarı", default: "" },
    _createdby: {
      type: String,
      label: "Oluşturan",
      default: global.sys_user,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const lislocks = mongoose.model("lislocks", schema);

export default lislocks;
