<template>
  <l-div v-if="dv.lisDialog == 'FINT01D01'">
    <!--Tittle Layer-->
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="account_balance" />

        <l-toolbar-title>{{
          this.$gl("Hesap Planı", "Account Plan")
        }}</l-toolbar-title>

        <l-btn
        v-if="isChild04 == undefined"
          icon="cancel"
          flat
          dense
          color="negative"
          @click="this.$btnGoHome(tabInfo)"
        />
        <l-btn
          v-if="isChild04 != undefined"
          icon="cancel"
          flat
          round
          color="negative"
          @click="cancel()"
        />
      </l-toolbar>

      <l-div-flex>
        <l-select
          :label="this.$gl(`Firma`, `Company`)"
          v-model="dv.sc.company"
          options="lisbas001"
          optValue="company"
          optTitle="stext"
          optCaptions="company"
          width="120px"
          class="bg-blue-1"
        />

        <l-select
          :label="this.$gl(`Hesap Tipi`, `Account Type`)"
          v-model="dv.sc.acctype"
          options="lisfin004"
          optValue="acctype"
          optTitle="stext"
          optCaptions="acctype"
          width="130px"
        />

        <l-input
          :label="this.$gl(`Hesap No`, `Account No`)"
          v-model="dv.sc.account"
        >
        </l-input>
        <l-input
          :label="this.$gl(`Hesap Açk.`, `Account Descr.`)"
          dense
          v-model="dv.sc.stext"
        ></l-input>

        <l-select
          :label="this.$gl(`P.Br.`, `Currency`)"
          v-model="dv.sc.currency"
          options="lisbas007"
          optValue="unit"
          optTitle="stext"
          optCaptions="unit"
          :optFilter="{ unittype: 1 }"
          width="135px"
        />

        <l-input
          :label="this.$gl(`T.D Hesap`, `Uniform Account`)"
          v-model="dv.sc.glaccount"
        >
        </l-input>
        <l-input
          :label="this.$gl(`Hesap Sınıfı`, `Account Class`)"
          dense
          v-model="dv.sc.accclass"
          width="100px"
        ></l-input>

        <l-select
          :label="this.$gl(`Hesap Grubu`, `Account Group`)"
          v-model="dv.sc.accgrp"
          options="lisfin005"
          optValue="group"
          optTitle="stext"
          optCaptions="group"
          width="150px"
        />

        <l-select
          :label="this.$gl(`Hesap Seviyesi`, `Account Level`)"
          map-options
          v-model="dv.sc.acclevel"
          :options="[
            {
              label: this.$gl(`Ana Hesap`, `Main Acc.`),
              value: 0,
            },
            {
              label: this.$gl(`Üst Hesap`, `Group Acc.`),
              value: 1,
            },
            {
              label: this.$gl(`Güncellenebilir Hesap`, `Direct Acc.`),
              value: 2,
            },
            { label: this.$gl(`Tümü`, `All`), value: 99 },
          ]"
          optValue="value"
          optTitle="label"
          style="width: 250px"
        />

        <l-checkbox
          :label="this.$gl(`Silindi`, `Deleted`)"
          v-model="dv.sc._deleted"
          color="pink"
        />
      </l-div-flex>
    </l-card0>

    <!--Searching Criterias Layer------>

    <!--------------------------------->

    <!--Butons Layer Layer---------------------->

    <l-div0-flex class="q-gutter-xs">
      <l-btn color="warning" icon="search" @click="btnSearch()" />
      <l-btn color="info" icon="visibility" @click="btnShow()" />
      <l-btn color="primary" icon="edit" @click="btnEdit()" />
      <l-btn color="secondary" icon="add" @click="btnInsert()" />
      <l-btn color="deep-orange" icon="print" @click="btnDelete()" />

      <l-space />
      <l-btn
        label="Hesap Hareketleri"
        color="primary"
        outline
        @click="showFint03()"
      />
      <l-space />
    </l-div0-flex>

    <l-table
      name="FINT01D01"
      v-model="dv.reportList"
      :columns="myColumnsFin"
      :context="contextMenu"
      :readonly="true"
      height="fit"
      :summary="false"
      @dblclick="btnEdit()"
    />
  </l-div>
  <FINT01D02
    :dv="dv"
    :tabInfo="tabInfo"
    :pCompany="dv.pCompany"
    :pAcctype="dv.pAcctype"
    :pAccount="dv.pAccount"
    :modi="dv.modi"
    v-if="dv.lisDialog == 'FINT01D02'"
  />
  <l-dialog v-model="isShowFint03" persistent>
    <l-card0>
      <FINT03D01
        :cv="dv.sc"
        :tabInfo="tabInfo"
        :isChild="true"
        @cancel="isShowFint03 = false"
      />
    </l-card0>
  </l-dialog>
</template>

<script>
import FINT01D02 from "./FINT01D02.vue";
import FINT03D01 from "../../FIN/FINT03/FINT03D01.vue";

export default {
  props: ["lv",  "goToTransaction", "currentTab", "tabInfo"],
  components: {
    FINT01D02,
    FINT03D01,
  },

  data() {
    return {
      isSelectAcc: false,
      isSelectGla: false,
      isShowFint03: false,
      dv: {
        sc: {
          company: "01",
          acctype: "",
          account: "",
          stext: "",
          currency: "",
          glaccount: "",
          accclass: "",
          accgrp: "",
          acclevel: 99,
          _deleted: false,
        },

        lisDialog: "FINT01D01",
        modi: 2,
        pCompany: "",
        pAcctype: "",
        pAccount: "",
        selectedRow: "",
        reportList: [],
        lisaccounts: {},
      },
      myColumnsFin: [
        {
          label: this.$gl("Firma", "Company"),
          value: "company",
          type: "string",
          default: "01",
        },
        {
          label: this.$gl(`Hesap Tipi`, `Account Type`),
          value: "acctype",
          type: "string",
        },

        {
          label: this.$gl(`Hesap No`, `Account No`),
          value: "account",
          type: "string",
        },
        {
          label: this.$gl(`Hesap Açkl.`, `Account Descr.`),
          value: "stext",
          type: "string",
        },
        {
          label: this.$gl(`Muhasebe  Standartı`, `Accounting Standard`),
          value: "accstd",
          type: "number",
        },
        {
          label: this.$gl(`T.D Hesap`, `Uniform Account`),
          value: "glaccount",
          type: "string",
        },

        {
          label: this.$gl(`Hesap Seviyesi`, `Account Level`),
          value: "acclevel",
          fetchValue: "acclevel",
          type: "select",
          options: [
            {
              label: this.$gl(`Ana Hesap`, `Main Acc.`),
              value: 0,
            },
            {
              label: this.$gl(`Üst Hesap`, `Group Acc.`),
              value: 1,
            },
            {
              label: this.$gl(`Güncellenebilir Hesap`, `Direct Upd.`),
              value: 2,
            },
          ],
        },

        {
          label: this.$gl(`Hesap Sınıfı`, `Account Class`),
          value: "accclass",
          type: "string",
        },
        {
          label: this.$gl(`Hesap Grubu`, `Account Group`),
          value: "accgrp",
          type: "string",
        },
        {
          label: this.$gl(`Para Birimi`, `Currency`),
          value: "currency",
          type: "string",
        },

        // {
        //   label: this.$gl(`Silinecek?`, `Is Delete?`),
        //   value: "_deleted",
        //   type: "checkbox",
        // },
      ],
    };
  },

  methods: {
    async btnSearch() {
      this.dv = await this.lis.function("FINT01/01-btnSearch", this.dv);

      this.dv.reportList.forEach((e) => {
        if (e.acclevel == 0) {
          e._bgColor = "#e0f7fa";
        }
        if (e.acclevel == 1) {
          e._bgColor = "#fff8e1";
        }
      });
    },
    async btnEdit() {
      this.dv = await this.lis.function("FINT01/01-btnEdit", this.dv);
    },
    async btnShow() {
      this.dv = await this.lis.function("FINT01/01-btnShow", this.dv);
    },
    async btnInsert() {
      this.dv = await this.lis.function("FINT01/01-btnInsert", this.dv);
    },
    async btnDelete() {
      this.dv = await this.lis.function("FINT01/01-btnDelete", this.dv);
    },
    async init() {
      this.dv = await this.lis.function("FINT01/01-init", this.dv);
    },
    cancel() {
      this.$emit("cancel", false);
    },
    showFint03() {
      let selectedRow = this.dv.reportList.filter((e) => e._selected == true);
      console.log("selectedRow", selectedRow);
      this.dv.sc.busarea = selectedRow[0].busarea;
      this.dv.sc.acctype = selectedRow[0].acctype;
      this.dv.sc.account = selectedRow[0].account;
      this.isShowFint03 = true;
    },
  },

  mounted() {
    this.init(this.dv);
    console.log("mounted worked");
    if (this.mv != undefined) {
      this.dv.sc.busarea = this.mv.busarea;
      this.dv.sc.acctype = this.mv.acctype;
      this.dv.sc.account = this.mv.account;
      this.btnSearch();
      console.log("SEARCH worked");
    }
  },
};
</script>
