// lisinvdocs - Inventory Documents.

import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
    itemnum: { type: Number, label: "Kalem no", default: 10 },
    //************ */
    matgrp: { type: String, label: "Malzeme Grubu", default: "" },
    mattype: { type: String, label: "Malzeme Tipi", default: "" },
    material: { type: String, label: "Malzeme Kodu", default: "" },
    mtext: { type: String, label: "Malzeme Adı", default: "" },
    variant: { type: String, label: "Varyant", default: "" },
    //** Inventory */
    movecode: { type: String, label: "hareket kodu", default: "" },
    invmanag: { type: String, label: "Env yön. tipi", default: "" },
    ordertype: { type: String, label: "Sipariş tipi", default: "" },
    plant: { type: String, label: "stok yeri", default: "" },
    warehouse: { type: String, label: "Depo", default: "" },
    stockplace: { type: String, label: "Stokyeri", default: "" },
    specialstock: { type: String, label: "Özel stok tipi", default: "" },
    batchnum: { type: String, label: "Parti no", default: "" },
    postway: { type: Number, label: "Hareket yönü", default: 0 }, // 0:Giriş|1:Çıkış
    stocktype: { type: Number, label: "Stok tipi", default: 0 }, // 0:Kullanılabilir|1:Kalite|2:Bloke|3:rezerve
    isstocktran: { type: Boolean, label: "Transfer Hareketi", default: false },
    //-
    quantity: { type: Number, label: "Miktar", default: 0 },
    qunit: { type: String, label: "Miktar br", default: "" },
    skquantity: { type: Number, label: "stok miktarı", default: 0 },
    skunit: { type: String, label: "stok saklama birimi", default: "" },

    //** Ekstra Infos */
    vendor: { type: String, label: "Tedarikçi", default: "" },
    freighter: { type: String, label: "Taşıyıcı", default: "" },
    customer: { type: String, label: "Müşteri", default: "" },
    project: { type: String, label: "Proje", default: "" },
    stext: { type: String, label: "Kısa açıklama", default: "" },
    ltext: { type: String, label: "Uzun açıklama", default: "" },

    //** Production Infos */
    workcenter: { type: String, label: "İş Merkezi", default: "" },
    operation: { type: String, label: "Onay Numarası", default: "" },
    confirmpos: { type: String, label: "Onay Sırası", default: "" },

    //** COST */
    ispricing: { type: Boolean, label: "Tutarla?", default: true },
    postkey: { type: String, label: "kayıt anahtarı", default: "" },
    cplant: { type: String, label: "M.M.Tesisi", default: "" },
    costcenter: { type: String, label: "Maliyet merkezi", default: "" },
    costobject: { type: String, label: "Maliyet objesi", default: "" },
    //** Refdoc */
    reftype: { type: String, label: "Referans tipi", default: "" },
    refdoctype: { type: String, label: "Referans belge tipi", default: "" },
    refdocnum: { type: String, label: "Referans belge no", default: "" },
    refitemnum: { type: Number, label: "Referans kalem no", default: "" },

    //******************* */
    purdoctype: {
        type: String,
        label: "Referans Alış Döküman Tipi",
        default: "",
    },
    purdocnum: { type: String, label: "Referans Alış Döküman no", default: "" },
    puritemnum: {
        type: String,
        label: "Referans Alış Döküman kalem no",
        default: "",
    },
    prddoctype: {
        type: String,
        label: "Referans Üretim Döküman Tipi",
        default: "",
    },
    prddocnum: {
        type: String,
        label: "Referans Üretim Döküman no",
        default: "",
    },
    saldoctype: {
        type: String,
        label: "Referans Satış Döküman Tipi",
        default: "",
    },
    saldocnum: {
        type: String,
        label: "Referans Satış Döküman no",
        default: "",
    },
    salitemnum: {
        type: String,
        label: "Referans Satış Döküman kalem no",
        default: "",
    },
    //******************* */
});

//******************************************************************************************************************** */
//*******************************************************HEAD********************************************************* */

const schema = new mongoose.Schema(
    {
        company: { type: String, label: "Firma Kodu", default: "" },
        doctype: { type: String, label: "Döküman tipi", default: "" },
        docnum: { type: String, label: "Dökümam no", default: "" },
        extdoctype: { type: String, label: "Harici Döküman tipi", default: "" },
        extdocnum: { type: String, label: "Harici Dökümam no", default: "" },

        docdate: { type: Date, label: "Döküman Tarihi", default: new Date() },
        curdate: { type: Date, label: "Kur Tarihi", default: new Date() },
        stext: { type: String, label: "Belge Açıklama", default: "" },
        //*************************** */

        edeltype: { type: Number, label: "E-irsaliye tipi", default: "" }, //0:none|1:e-delivery
        edelnumber: { type: String, label: "E-irsaliye no", default: "" },
        edeluuid: { type: String, label: "E-irsaliye uuid", default: "" },

        //******************* */

        items: [itemsSchema],

        //******************* */

        _deleted: { type: Boolean, label: "Silindi mi?", default: false },
        _createdby: {
            type: String,
            label: "Oluşturan",
            default: global.sys_user,
        },
        _updatedby: {
            type: String,
            label: "Güncelleyen",
            default: global.sys_user,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const lisinvdocs = mongoose.model("lisinvdocs", schema);

export default lisinvdocs;
