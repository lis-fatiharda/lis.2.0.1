<template>
  <l-div v-if="dv.lisDialog == 'PURT01D01'">
    <l-card0>
      <l-toolbar :class="`bg-${tabInfo.moduleColor}`">
        <l-icon size="md" name="description" />

        <l-toolbar-title>{{
          this.$gl("Satınalma Belgeleri", "Purchasing Documents")
        }}</l-toolbar-title>

        <l-btn
          icon="cancel"
          flat
          round
          dense
          color="negative"
          @click="this.$btnGoHome(tabInfo)"
        />
      </l-toolbar>
      <!--Searching Criterias Layer----row-1-->
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
          :label="this.$gl(`İş Alanı`, `Business Area`)"
          v-model="dv.sc.busarea"
          options="lisbas003"
          optValue="busarea"
          optTitle="stext"
          optCaptions="busarea"
          width="120px"
        />

        <l-select
          :label="this.$gl(`Belge Tipi`, `Document Type`)"
          v-model="dv.sc.doctype"
          options="lispur001"
          optValue="doctype"
          optTitle="stext"
          optCaptions="doctype"
          width="125px"
        />

        <l-input
          dense
          v-model="dv.sc.docnum"
          :label="this.$gl(`Belge No`, `Document No`)"
        />
        <l-select
          :label="this.$gl(`Proje Kodu`, `Project Code`)"
          v-model="dv.sc.project"
          options="liscrm003"
          optValue="project"
          optTitle="stext"
          optCaptions="project"
          width="140px"
        />

        <l-select
          :label="this.$gl(`S.A. Bölümü`, `Purchasing Department`)"
          v-model="dv.sc.purdept"
          options="lispur003"
          optValue="purdept"
          optTitle="stext"
          optCaptions="purdept"
          width="150px"
        />

        <!-- Customer Informations -->

        <l-input
          :label="this.$gl(`Tedarikçi Kodu`, `Vendor Code`)"
          dense
          v-model="dv.sc.vendor"
        >
          <l-chip
            icon="search"
            class="bg-white"
            dense
            clickable
            @click="isSelectVend = !isSelectVend"
          >
            <BAST02D01mini
              :pComp="dv.sc.company"
              :isShow="isSelectVend"
              @ok="
                dv.sc.vendor = $event.customer;
                isSelectVend = false;
              "
              @cancel="isSelectVend = false"
            />
          </l-chip>
        </l-input>

        <l-input
          :label="this.$gl(`Tedarikçi Adı`, `Vendor Name`)"
          v-model="dv.sc.name1"
          style="width: 300px"
          dense
        >
        </l-input>

        <l-input
          :label="this.$gl(`Malzeme Kodu`, `Material`)"
          dense
          v-model="dv.sc.material"
        >
          <l-chip
            class="bg-white"
            icon="search"
            dense
            clickable
            @click="isSelectMat = !isSelectMat"
          >
            <BAST03D01mini
              :pComp="dv.sc.company"
              :isShow="isSelectMat"
              @ok="
                dv.sc.material = $event.material;
                isSelectMat = false;
              "
              @cancel="isSelectMat = false"
            />
          </l-chip>
        </l-input>
        <l-input
          :label="this.$gl(`Malzeme Adı`, `Material Name`)"
          v-model="dv.sc.mtext"
          style="width: 300px"
        />

        <l-input
                        v-model="dv.sc.variant"
                        :label="
                            this.$gl(
                                `Varyant`,
                                `Variant`
                            )
                        "
                    />

        <l-date
          v-model="dv.sc.docdate1"
          :label="this.$gl(`Başlangıç Tarihi`, `Starting date`)"
          style="width: 160px"
        />
        <l-date
          v-model="dv.sc.docdate2"
          :label="this.$gl(`Bitiş Tarihi`, `Ending date`)"
          style="width: 160px"
        />

        <l-select
          :label="this.$gl(`Belge Karakteristiği`, `Document Characteristic`)"
          v-model-value="dv.sc.docChar"
          :options="[
            { label: this.$gl(`İstek`, `Request`), value: 0 },
            { label: this.$gl(`Teklif`, `Offer`), value: 1 },
            { label: this.$gl(`Sipariş`, `Order`), value: 2 },
            {
              label: this.$gl(`İrsaliye`, `Waybill`),
              value: 3,
            },
            { label: this.$gl(`Fatura`, `Invoice`), value: 4 },
            { label: this.$gl(`Tümü`, `All`), value: 99 },
          ]"
          optValue="value"
          optTitle="label"
          map-options
          style="width: 180px"
        />

        <l-select
          :label="this.$gl(`Belge Statüsü`, `Document Status`)"
          map-options
          v-model="dv.sc.docStat"
          :options="[
            { label: this.$gl(`Açık`, `Open`), value: 0 },
            { label: this.$gl(`Kısmi`, `Partial`), value: 1 },
            { label: this.$gl(`Kapalı`, `Closed`), value: 2 },
            { label: this.$gl(`Tümü`, `All`), value: 99 },
          ]"
          optValue="value"
          optTitle="label"
          style="width: 180px"
        />
        <l-checkbox
          :label="this.$gl(`Silindi?`, `Is Delete?`)"
          v-model="dv.sc._deleted"
          color="pink"
        />
      </l-div-flex>
      <!--------------------------------row-2-->
      <!--------------------------------row-3-->
    </l-card0>
    <!--Butons Layer Layer---------------------->

    <!-- <l-btn color="warning" icon="search" @click="btnSearch(dv)" @keypress.enter=""/> -->
    <l-btn color="warning" icon="search" @click="btnSearch()" />
    <l-btn color="info" icon="visibility" @click="btnShow()" />
    <l-btn color="primary" icon="edit" @click="btnEdit()" />
    <l-btn color="secondary" icon="add" @click="btnInsert()" />
    <l-btn color="deep-orange" icon="print" @click="btnPrint()" />

    <q-toggle
      :label="dv.toggle"
      color="pink"
      :true-value="this.$gl(`Ağaç`, `Tree View`)"
      :false-value="this.$gl(`Tablo`, `Table View`)"
      v-model="dv.toggle"
    />
    <l-chip
      :label="this.$gl(`İmza`, `Signature`)"
      clickable
      outline
      icon="edit"
      color="negative"
      text-color="white"
      @click="signDocument()"
    />
    <!--Table Layer---------------------------->

    <l-table
      v-model="dv.purDocList"
      :columns="myColumnsPur"
      :context="contextMenu"
      height="fit"
      :readonly="true"
      @dblclick="btnEdit()"
    />
    <l-dialog
      v-model="isCallFlow.isShow"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <l-card class="bg-grey-2" style="height: 100%">
        <PURT02D01
          :pDv="isCallFlow"
          @close="
            isCallFlow.isShow = false;
            v - close - popup;
          "
          :tabInfo="tabInfo"
          :lv="lv"
        />
      </l-card>
    </l-dialog>
  </l-div>
  <q-dialog
    v-model="dv.isShowCopyDocs"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <PURT01D12 :dv="dv" :tabInfo="tabInfo"
  /></q-dialog>
  <PURT01D02 :dv="dv" :tabInfo="tabInfo" v-if="dv.lisDialog == 'PURT01D02'" />
  <div v-show="false">
    <PURT01D01PDF :dv="dv" />
  </div>
</template>

<script>
import PURT01D02 from "./PURT01D02.vue";
import PURT02D01 from "../PURT02/PURT02D01.vue";
import PURT01D12 from "./PURT01D12.vue";
import PURT01D01PDF from "./PURT01D01PDF.vue";

export default {
  props: ["lv", "tabInfo"],
  components: {
    PURT01D02,
    PURT02D01,
    PURT01D12,
    PURT01D01PDF,
  },

  data() {
    return {
      isCallFlow: { isShow: false },

      contextMenu: [
        {
          name: "Belge Kopyala",
          callback: async () => {
            this.selectedRowCopy = this.dv.purDocList.findIndex(
              (e) => e._selected == true
            );
            let ctrlCopy = await this.lis.function("PURT01/01-getCopyDocs", {
                company: this.dv.purDocList[this.selectedRowCopy].company,
                doctype: this.dv.purDocList[this.selectedRowCopy].doctype,
                docnum: this.dv.purDocList[this.selectedRowCopy].docnum,
            });
            console.log("ctrlCopy",ctrlCopy);
            if(ctrlCopy == undefined){this.dv.isShowCopyDocs = false} else{this.dv.isShowCopyDocs = true;}
              
          },
        },
        {
          name: "Gelişim",
          callback: () => {
            let selectedRow = this.dv.purDocList.filter(
              (e) => e._selected == true
            );
            console.log("selectedRow", selectedRow);
            this.isCallFlow = {
              isShow: true,
              calledBy: "PURT01D01",
              company: selectedRow[0].company,
              busarea: selectedRow[0].busarea,
              doctype: selectedRow[0].doctype,
              docnum: selectedRow[0].docnum,
              itemnum: 0,
            };
          },
        },
        {
          name: "separator",
        },
        {
          name: "Muhasebeleştir",
        },
      ],
      myColumnsPur: [
        {
          label: this.$gl(`Firma`, `Company`),
          value: "company",
          type: "string",
        },
        {
          label: this.$gl(`İş Alanı`, `Business Area`),
          value: "busarea",
          type: "string",
        },
        {
          label: "Belge Tipi",
          value: "doctype",
          type: "string",
        },
        {
          label: "Belge No",
          value: "docnum",
          type: "string",
        },

        {
          label: this.$gl(`Belge Tarihi`, `Document Date`),
          value: "docdate",
          type: "datetime",
          textColor: "red",
        },
        {
          label: "Tedarikçi Kodu",
          value: "vendor",
          type: "string",
          textColor: "blue",
        },
        {
          label: "Tedarikçi Adı",
          value: "name1",
          type: "string",
          textColor: "blue",
        },
        {
          label: "Proje",
          value: "project",
          type: "string",
        },
        {
          label: "Brüt",
          value: "gross",
          type: "number",
          textColor: "#23978c",
        },
        {
          label: "İndirim",
          value: "discamnt",
          type: "number",
          textColor: "#23978c",
        },
        {
          label: "Net",
          value: "subtotal",
          type: "number",
          textColor: "#23978c",
        },
        {
          label: "Genel Toplam",
          value: "grandtotal",
          type: "number",
          textColor: "#23978c",
        },
        {
          label: "P.Br.",
          value: "currency",
          type: "string",
          textColor: "#23978c",
        },

        {
          label: "Belge Statüsü",
          value: "docstat",
          type: "select",
          textColor: "red",
          options: [
            {
              label: `Açık`,
              value: 0,
            },
            {
              label: `Kısmi`,
              value: 1,
            },
            {
              label: `Kapalı`,
              value: 2,
            },
          ],
        },
        {
          label: this.$gl(`Muhasebeleşti`, `is Finance?`),
          value: "isfinance",
          type: "checkbox",
        },
      ],

      dv: {
        lisDialog: "PURT01D01",
        modi: 2,
        selectedRow: "",
        toggle: "Tablo",
        isShowFinDoc: false,
        isShowFinDocDialog: false,
        isShowCopyDocs: false,
        selectedRowCopy: false,
        ovariant: {},
        sc: {
          company: "01",
          busarea: "S",
          doctype: "",
          docnum: "",
          vendor: "",
          name1: "",
          material: "",
          mtext: "",
          variant: "",
          paymcond: "",
          docStat: 99,
          docChar: 99,
          project: "",
          purdept: "",
          docdate1: this.lis.firstDayOfMonth(),
          docdate2: this.lis.lastDayOfMonth(),
          _deleted: false,
        },

        purDocList: [],
        lispurdocs: {},
        lisfindocs: {},
        openItems: [],
        lispurdocsPrototype: {},
        lisVendor: {},
        copyDocsList: [],
        discOptsH: [],
        discOpts: [],

        lockKeyParams: {
          company: "",
          lid: "PURT01",
          lockkey: "",
        },
      },
      indexRow: false,
      isSelectVend: false,
      isSelectMat: false,
    };
  },

  methods: {
    async getCopyDocs(item) {
      this.dv.copyDocsList = await this.lis.function("PURT01/01-getCopyDocs", {
        doctype: item.doctype, docnum: item.docnum,

      });
      console.log("docnum", item.docnum);
    },
    async btnSearch() {
      this.dv = await this.lis.function("PURT01/01-btnSearch", this.dv);
    },
    async btnEdit() {
      this.dv = await this.lis.function("PURT01/01-btnEdit", this.dv);
    },
    async btnShow() {
      this.dv = await this.lis.function("PURT01/01-btnShow", this.dv);
    },
    async btnInsert() {
      this.dv = await this.lis.function("PURT01/01-btnInsert", this.dv);
    },
    async btnPrint() {
      this.lis.printPdf("PURT01D01PDF", "Satın Alma Belgeleri Raporu");
    },
    //         async btnPrint(prop) {
    //             this.lis.printDirect(`CT~~CD,~CC^~CT~
    // ^XA~TA000~JSN^LT0^MNW^MTT^PON^PMN^LH0,0^JMA^PR4,4~SD10^JUS^LRN^CI0^XZ
    // ^XA
    // ^MMT
    // ^PW480
    // ^LL0799
    // ^LS0
    // ^FT83,415^A0R,70,55^FH\^FDXCONTROLLERX^FS
    // ^FT83,34^A0R,70,69^FH\^FDXDATEDATEX^FS
    // ^FT228,414^A0R,70,64^FH\^FD    XPRDORDERX^FS
    // ^FT228,33^A0R,70,69^FH\^FDXMATERIALX^FS
    // ^FT384,113^A0R,87,86^FH\^FD   XNUMUNEREDX^FS
    // ^FT313,531^A0R,34,36^FH\^FDIs Emri^FS
    // ^FT315,138^A0R,34,36^FH\^FDMalzeme^FS
    // ^PQ1,0,1,Y^XZ
    // `);
    //             this.dv = await this.lis.function("PURT01/01-btnPrint", prop);
    //         },
    async init() {
      this.dv = await this.lis.function("PURT01/01-init", this.dv);
    },
    async signDocument() {
      let selectedRowPur = this.dv.purDocList.filter(
        (e) => e._selected == true
      );
      await this.lis.function("PURT01/signDocument", selectedRowPur[0]);
      this.lis.alert("p", "Belge İmzalandı.");
    },
  },

  // mounted() {
  //     this.init(this.dv);
  // },
};
</script>
