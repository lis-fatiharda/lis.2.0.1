// lissal006 - Delivery Method 

import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },

        shipping: {
            type: String,
            label: "Teslimat Tipi",
            default: "",
        },

        stext: {
            type: String,
            label: "Teslimat Açıklaması",
            default: "",
        },

        _deleted: { type: Boolean, label: "Silindi mi?", default: false }, // 0:silinmedi | 1:silindi
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lissal006 = mongoose.model("lissal006", schema);

export default lissal006;
