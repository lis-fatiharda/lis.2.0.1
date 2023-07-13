//  - Customer - Vendor : Materıals

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: { type: String, label: "Firma", default: "" },
    customer: { type: String, label: "Müşteri Kodu", default: "" },
    name: { type: String, label: "Müşteri Adı", default: "" },
    material: { type: String, label: "Malzeme Kodu", default: "" },
    mtext: { type: String, label: "Malzeme Adı", default: "" },
    materialcust: {
      type: String,
      label: "Müşterideki Malzeme Kodu",
      default: "",
    },
    mtextcust: {
      type: String,
      label: "Müşterideki Malzeme Adı",
      default: "",
    },
    custorvend: {
      type: String,
      enum: ["Müşteri", "Tedarikçi"],
      label: "Müşteri - Tedarikçi malzemesi",
      default: "Müşteri",
    }, // 0:Müşteri | 1:Tedarikçi
    createdby: {
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

const liscusmats = mongoose.model("liscusmats", schema);

export default liscusmats;
