<template>
    <div>
        <l-div v-if="mv.lisDialog == 'LISFIN003'">
            <!--Tittle Layer-->
            <l-card>
                <q-bar class="bg-blue-grey-3">
                    Destek Tablosu - lisfin003
                </q-bar>
                <q-bar :class="`bg-${tabInfo.moduleColor}`">
                    <l-toolbar-title>{{
                        this.$gl(
                            "Muhasebe Kayıt Anahtarları",
                            "Accounting Registration Key"
                        )
                    }}</l-toolbar-title>

                    <l-btn
                        icon="cancel"
                        flat
                        round
                        dense
                        color="negative"
                        @click="cancel()"
                    />
                </q-bar>

                <l-div-flex>
                    <l-select
                        :label="this.$gl(`Firma`, `Company`)"
                        v-model="mv.sc.company"
                        options="lisbas001"
                        optValue="company"
                        optTitle="stext"
                        optCaptions="company"
                        width="120px"
                    />
                    <l-input
                        :label="this.$gl(`Kayıt Anahtarı`, `Registration Key`)"
                        dense
                        v-model="mv.sc.registkey"
                    ></l-input>
                    <l-input
                        :label="this.$gl(`Açıklama`, `Description`)"
                        dense
                        v-model="mv.sc.stext"
                    ></l-input>
                    <l-select
                        v-model="mv.status"
                        :label="this.$gl(`Statü`, `Status`)"
                        :options="[
                            { label: this.$gl(`Serbest`, `Free`), value: 0 },
                            {
                                label: this.$gl(`Zorunlu`, `Compulsory`),
                                value: 1,
                            },
                            {
                                label: this.$gl(
                                    `Boş Bırakılmalı`,
                                    `Should be left blank`
                                ),
                                value: 2,
                            },
                        ]"
                        map-options
                        optValue="value"
                        style="width: 200px"
                    />
                    <l-select
                        v-model="mv.entgr"
                        :label="this.$gl(`Entegrasyon`, `Integration`)"
                        :options="[
                            {
                                label: this.$gl(
                                    `Entegrasyonsuz`,
                                    `No Integration`
                                ),
                                value: 0,
                            },
                            {
                                label: this.$gl(`Entegrasyonlu`, `Integrated`),
                                value: 1,
                            },
                            {
                                label: this.$gl(`Her İkisi`, `Both of them`),
                                value: 2,
                            },
                        ]"
                        map-options
                        optValue="value"
                        style="width: 200px"
                    />
                    <l-input
                        :label="this.$gl(`Değer Alanı`, `Value Area`)"
                        dense
                        v-model="mv.sc.valuearea"
                    ></l-input>
                    <l-select
                        :label="this.$gl(`Hesap Tipi`, `Account Type`)"
                        v-model="mv.sc.acctype"
                        options="lisfin004"
                        optValue="acctype"
                        optTitle="stext"
                        optCaptions="acctype"
                        width="130px"
                    />

                    <l-input
                        :label="this.$gl(`Hesap No`, `Account No`)"
                        dense
                        v-model="mv.sc.account"
                    ></l-input>
                    <l-select
                        v-model="mv.vatkey"
                        :label="this.$gl(`KDV Anahtarı`, `VAT Key`)"
                        :options="[
                            { label: this.$gl(`Hayır`, `No`), value: 0 },
                            { label: this.$gl(`Evet`, `Yes`), value: 1 },
                            {
                                label: this.$gl(`Hepsi`, `All`),
                                value: 2,
                            },
                        ]"
                        map-options
                        optValue="value"
                        style="width: 150px"
                    /><l-select
                        v-model="mv.stoppage"
                        :label="this.$gl(`Stopaj`, `Stoppage`)"
                        :options="[
                            { label: this.$gl(`Hayır`, `No`), value: 0 },
                            { label: this.$gl(`Evet`, `Yes`), value: 1 },
                            {
                                label: this.$gl(`Hepsi`, `All`),
                                value: 2,
                            },
                        ]"
                        map-options
                        optValue="value"
                        style="width: 150px"
                    /><l-select
                        v-model="mv.check"
                        :label="this.$gl(`Çek`, `Check`)"
                        :options="[
                            { label: this.$gl(`Hayır`, `No`), value: 0 },
                            { label: this.$gl(`Evet`, `Yes`), value: 1 },
                            {
                                label: this.$gl(`Hepsi`, `All`),
                                value: 2,
                            },
                        ]"
                        map-options
                        optValue="value"
                        style="width: 150px"
                    /><l-select
                        v-model="mv.sync"
                        :label="this.$gl(`Eşitleme`, `Sync`)"
                        :options="[
                            { label: this.$gl(`Hayır`, `No`), value: 0 },
                            { label: this.$gl(`Evet`, `Yes`), value: 1 },
                            {
                                label: this.$gl(`Hepsi`, `All`),
                                value: 2,
                            },
                        ]"
                        map-options
                        optValue="value"
                        style="width: 150px"
                    />
                </l-div-flex>
            </l-card>

            <!--Searching Criterias Layer------>

            <!--------------------------------->

            <!--Butons Layer Layer---------------------->

                    <l-btn
                        color="warning"
                        icon="search"
                        @click="btnSearch(mv)"
                    />
                    <l-btn color="primary" icon="edit" @click="btnEdit(mv)" />
                    <l-btn
                        color="secondary"
                        icon="add"
                        @click="btnInsert(mv)"
                    />
                    <l-btn
                        color="negative"
                        icon="delete"
                        @click="btnDelete(mv)"
                    />

            <l-table
                name="LISFIN003"
                v-model="mv.lisfin003List"
                :columns="myColumnsFin002"
                :context="contextMenu"
                :height="'70vh'"
                :width="'100%'"
                :readonly="true"
            />
        </l-div>
        <LISFIN003D002
            :mv="mv"
            :dv="dv"
            :lv="lv"
            :tabInfo="tabInfo"
            v-if="mv.lisDialog == 'LISFIN003D002'"
        />
    </div>
</template>

<script>
import LISFIN003D002 from "./LISFIN003D002.vue";

export default {
    props: ["lv", "dv", "goToTransaction", "currentTab", "tabInfo"],
    components: {
        LISFIN003D002,
    },

    data() {
        return {
            mv: {
                sc: {
                    company: "01",
                    acctype: "",
                    registkey: "",
                    account: "",
                    stext: "",
                    status: [],
                    entgr: [],
                    stoppage: [],
                    vatkey: [],
                    sync: [],
                    check: [],
                    currency: "",
                    valuearea: "",
                    glaccount: "",
                    accclass: "",
                    accgrp: "",
                    isdirectupd: false,
                    ismainacc: false,
                    _deleted: false,
                },

                lisDialog: "LISFIN003",
                modi: 2,
                lisfin003List: [],
                lisfin003: {},
                myColumnsfin02items: [],
            },
            myColumnsFin002: [
                {
                    label: this.$gl(`Firma`, `Company`),
                    value: "company",
                    type: "string",
                },
                {
                    label: `Muh. Standardı`,
                    value: "accstd",
                    type: "string"
                },

                {
                    label: this.$gl(`Belge Tipi`, `Document Type`),
                    value: "doctype",
                    type: "string",
                },
                {
                    label: this.$gl(`Belge Açıklaması`, `Document Text`),
                    value: "stext",
                    type: "string",
                },
                {
                    label: this.$gl(`Numara Aralığı`, `Number Range`),
                    value: "numrange",
                    type: "string",
                },
            ],
        };
    },

    methods: {
        async btnSearch(prop) {
            this.mv = await this.lis.function(
                "BAST01/SUPS/lisfin003/01-btnSearch",
                prop
            );
        },
        async btnEdit(prop) {
            this.mv = await this.lis.function(
                "BAST01/SUPS/lisfin003/01-btnEdit",
                prop
            );
        },
        async btnInsert(prop) {
            this.mv = await this.lis.function(
                "BAST01/SUPS/lisfin003/01-btnInsert",
                prop
            );
        },
        async btnDelete(prop) {
            this.mv = await this.lis.function(
                "BAST01/SUPS/lisfin003/01-btnDelete",
                prop
            );
            this.btnSearch(prop);
        },
        // async init(prop) {
        //   this.mv = await this.lis.function("lisfin003/01-init", this.mv);
        // },

        async cancel() {
            this.dv.lisDialog = "BAST01D01";
        },
    },

    //   mounted() {
    //     this.init(this.mv);
    //     console.log("mounted worked");
    //   },
    async beforeUnmount() {
        await this.lis.function("cls-system.unlock", {
            company: "01",
            lid: "BAST01",
            lockkey: this.dv.olismodels[0].model,
        });
        this.tabInfo.blockGoToTransaction = false;
    },
};
</script>
